import { headers } from "next/headers"
import { NextResponse } from "next/server"

const verified = process.env.VERIFYING_KEY
const verified_new = process.env.VERIFYING_NEW_KEY

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')

  if (accessToken) {
    try {
      const verifyingRes = await fetch('https://6ietu7gzmk.execute-api.ap-northeast-2.amazonaws.com/20230717/v0', {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ verified }),
      })
      if (verifyingRes.ok) {
        const verifyingData = await verifyingRes.json()
        const user_id = verifyingData.userId

        const res = await fetch(`https://uhc8bz5as0.execute-api.ap-northeast-2.amazonaws.com/20230716/resign`, {
          method: 'POST',
          body: JSON.stringify({ user_id, verified_new }),
        })

        if (res.ok) {
          return new Response('', {
            status: 200,
            headers: {
              'Set-Cookie': `_Authv4=; max-age:0; HttpOnly; Path=/`,
            },
          })
        } else {
          const errors = await res.json()
          return NextResponse.json({ error: 'Internal Server Error', errors }, { status: 500 })
        }

        //검증 실패
      } else {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    //토큰 없음
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}