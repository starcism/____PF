import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  if (accessToken) {
    return new Response('', {
      status: 200,
      headers: {
        'Set-Cookie': `_Authv4=; Max-Age=0; HttpOnly; Path=/;`,
      },
    })
  }
}
