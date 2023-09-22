// https://9z05g5impf.execute-api.ap-northeast-2.amazonaws.com/20230921/{proxy+}

import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const verified = process.env.VERIFYING_KEY

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  const { nickname, pre } = await request.json()

  if (nickname.length > 12 || nickname.length < 2 || nickname === pre) {
    return NextResponse.json({ error: '잘못된 형식' }, { status: 500 })
  }
  
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

        const res = await fetch(`https://9z05g5impf.execute-api.ap-northeast-2.amazonaws.com/20230921/info`, {
          method: 'POST',
          body: JSON.stringify({ userId: user_id, nickname, pre, req: 'nickname-change' }),
        })

        if (res.ok) {
          return NextResponse.json({ message: '닉네임 변경 완료' }, { status: 200 })
        } else {
          const { message } = await res.json()
          return NextResponse.json({ error: message }, { status: 500 })
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
