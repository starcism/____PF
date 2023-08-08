import { cookies } from "next/headers"
import { NextResponse } from "next/server"

//리프레시 토큰 검증 및 액세스 토큰 발급 요청
export async function POST(request: Request) {
  let cookie = cookies().get('_Authv4')
  const _Authv4 = cookie?.value
  if (_Authv4 && _Authv4 !== '') {
    const res = await fetch('https://6ietu7gzmk.execute-api.ap-northeast-2.amazonaws.com/20230717/v1', {
      method: 'POST', 
      headers: {
        Authorization: _Authv4,
      }
    })
    const data = await res.json()
    const _Authv1 = data.accessToken
    if (!_Authv1) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
    return new Response('', {
      status: 200,
      headers: { Authorization: _Authv1 },
    })
  } else {
    return NextResponse.json({ status:401, message:"Unauthorized" })
  }
}