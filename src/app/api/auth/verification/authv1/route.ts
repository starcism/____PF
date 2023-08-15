import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  if (accessToken) {
    try {
      const res = await fetch('https://6ietu7gzmk.execute-api.ap-northeast-2.amazonaws.com/20230717/v0', {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ verified: '' })
      })
      if (res.ok) {
        return NextResponse.json({ message: '인증 완료', status: res.status })
      } else {//res.status === 401 토큰만료, res.status === 403 토큰변조
        const data = await res.json()
        return NextResponse.json({ error: data.message }, { status: res.status })
      }
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } else return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
