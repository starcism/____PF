import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verifyToken } from './libs/verifyToken'


const secretKey = process.env.TOKEN_SECRET_KEY!
const limitPageWithoutAuth = [
  '/profile',
  '/free/write',
  '/photo/write',
  '/video/write',
];

const limitPageWithAuth = [
  '/auth',
]

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  if (
    !(limitPageWithAuth.some(path => request.nextUrl.pathname.startsWith(path))
    || limitPageWithoutAuth.some(path => request.nextUrl.pathname.startsWith(path)))
    ) {
    return response
  }

  let cookie = request.cookies.get('_Authv4')
  let isAuthorized = false

  if (cookie) {
    const refreshToken = cookie.value
    try {
      const decoded = await verifyToken(refreshToken, secretKey) //리프레시 토큰 검증
      if (!decoded) {
        response.cookies.set({
          name: '_Authv4',
          value: '',
          httpOnly: true,
          maxAge: 0,
          path: '/', // For all paths
        })
      } else {
        const nowDate = Date.now()
        const toSilentRefresh = nowDate + 60 * 60 * 24 * 30 * 1000
        if (decoded.exp! * 1000 > toSilentRefresh) {//만료기간 1달 이상 남음
          isAuthorized = true
        } else if (decoded.exp! * 1000 <= toSilentRefresh) {//1달 이하 남음
          const res = await fetch('https://6ietu7gzmk.execute-api.ap-northeast-2.amazonaws.com/20230717/v4', {
            method: 'POST',
            headers: {
              Authorization: refreshToken,
            }
          })
          const newRefreshToken = await res.json()
          response.cookies.set({//새 리프레시 토큰으로 갱신
            name: '_Authv4',
            value: newRefreshToken,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 60,
            path: '/', // For all paths
          })
          isAuthorized = true
        }
      }
    } catch (error) {//토큰 검증 실패시 리프레시 토큰 만료
      response.cookies.set({
        name: '_Authv4',
        value: '',
        httpOnly: true,
        maxAge: 0,
        path: '/',
      })
    }
  }
  if (isAuthorized && limitPageWithAuth.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  else if (!isAuthorized && limitPageWithoutAuth.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}