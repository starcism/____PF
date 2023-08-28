import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const verified = process.env.VERIFYING_KEY

function removeHtmlTags(content: string) {
  return content.replace(/<\/?[^>]+(>|$)/g, ''); // HTML 태그 제거
}

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  const { board_id, reply, comment_id } = await request.json()
  const boardId = parseInt(board_id, 10)
  //유효성 검사
  if (!reply || reply.length <= 1) {
    return NextResponse.json({ error: '제출 형식이 잘못되었어요' }, { status: 400 })
  }

  //악성 스크립트 주입 방지
  const sanitizedReply = removeHtmlTags(reply)

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

        const res = await fetch('https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/comment/free', {
          method: 'POST',
          body: JSON.stringify({ board_id: boardId, reply: sanitizedReply, user_id, comment_id, verified }),
        })

        if (res.ok) {
          return NextResponse.json({ message: '글쓰기를 완료했어요' }, { status: 200 })
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
