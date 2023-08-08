import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const secretKey = process.env.TOKEN_SECRET_KEY!

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  if (accessToken) {
    try {
      const res = await fetch('https://6ietu7gzmk.execute-api.ap-northeast-2.amazonaws.com/20230717/v0', {
        method: 'POST',
        headers: {
          Authorization: accessToken,
        },
      })
      return new Response('', {
        status: 200,
        headers: {
          'Set-Cookie': `_Authv4=; max-age:0; HttpOnly; Path=/`,
        },
      })
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } else return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
