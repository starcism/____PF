import { NextResponse } from 'next/server'

const clientId = process.env.KAKAO_CLIENT_ID
const redirectUri = process.env.KAKAO_REDIRECT_URI
// const redirectUri = 'http://localhost:3000/auth/callback/kakao'

export async function GET(request: Request) {
  try {
    // 로그인 인가 요청
    const authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`

    return NextResponse.json({
      status: 200,
      message: '주소 요청 성공',
      authUrl,
    })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: '카카오 로그인 인가 요청 실패',
    })
  }
}

export async function POST(request: Request) {
  const { code } = await request.json()
  try {
    const res = await fetch('https://uhc8bz5as0.execute-api.ap-northeast-2.amazonaws.com/20230716/kakao', {
      method: 'POST',
      body: JSON.stringify({ code }),
    })

    if (res.ok) {
      const { refreshToken } = await res.json()
      
      return new Response('', {
        status: 200,
        headers: {
          'Set-Cookie': `_Authv4=${refreshToken}; Max-Age=${60 * 60 * 24 * 60}; HttpOnly; Path=/`,
        },
      })
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
