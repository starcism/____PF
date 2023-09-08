import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const verified = process.env.VERIFYING_KEY

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  const formData = await request.formData()
  const title = formData.get('title')?.toString()

  //유효성 검사
  if (!title || title.length < 1 || title.length > 100) {
    return NextResponse.json({ error: '제출 형식이 잘못되었어요' }, { status: 400 })
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
        formData.append('userId', user_id)

        const res = await fetch('https://uq8hvp2my8.execute-api.ap-northeast-2.amazonaws.com/20230907/lvd', {
          method: 'POST',
          body: formData,
        })

        if (res.ok) {
          // const data = await res.json()
          // const boardId = data.boardId
          const data = await res.json()
          return NextResponse.json({ message: '글쓰기를 완료했어요', data }, { status: 200 })
        } else {
          const response = await res.json()
          return NextResponse.json({ error: 'Internal Server Error', response }, { status: 500 })
        }

        //검증 실패
      } else {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    } catch (errors) {
      return NextResponse.json({ error: 'Internal Server Error', errors }, { status: 500 })
    }

    //토큰 없음
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
