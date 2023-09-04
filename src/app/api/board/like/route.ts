import { headers } from "next/headers"
import { NextResponse } from "next/server"

const verified = process.env.VERIFYING_KEY

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  const { boardType, boardId } = await request.json()

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

        const res = await fetch(`https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/like/${boardType}`, {
          method: 'POST',
          body: JSON.stringify({ board_id: boardId, user_id, verified }),
        })

        if (res.ok) {
          const { userLike } = await res.json()

          return NextResponse.json({ message: '좋아요(취소) 완료', userLike }, { status: 200 })
        } else {
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
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
