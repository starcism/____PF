import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const verified = process.env.VERIFYING_KEY

const allowedTags = ['strong', 'em', 'u', 's', 'p', 'div', 'span', 'ul', 'ol', 'li', 'br', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

function sanitizeHtml(inputHtml: string) {
  const cleanedHtml = inputHtml.replace(/<\/?[^>]+(>|$)/g, (tag) => {
    const tagName = tag.replace(/[<\/>]/g, '').toLowerCase()
    if (allowedTags.includes(tagName)) {
      return tag
    }
    return ''
  })

  return cleanedHtml
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  // const path = request.nextUrl.pathname
  const pageIndex = searchParams.get('pageIndex')
  const boardId = searchParams.get('boardId')

  if (pageIndex) {

    try {
      // revalidatePath(path)

      const res = await fetch(`https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/board/free?pageIndex=${pageIndex}`, {
        method: 'GET',
        cache: 'no-store',
      })
      if (res.status === 200) {
        const { posts, totalPages } = await res.json()

        return NextResponse.json({ revalidated: true, now: Date.now(), posts, totalPages })
      } else if (res.status === 204) {
        return NextResponse.json({ message: '게시물 없음' }, { status: 204 })
      } else {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } else if (boardId) {

    try {

      const res = await fetch(`https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/free?boardId=${boardId}`, {
        method: 'GET',
        next: {
          revalidate: 10,
        }
      })

      if (res.status === 200) {
        const { post } = await res.json()

        return NextResponse.json({ post })
      } else if (res.status === 204) {
        return NextResponse.json({ message: '삭제된 게시물입니다.' }, { status: 204 })
      } else {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }
}
export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  const { title, content, contentValue } = await request.json()

  //유효성 검사
  if (!title || !contentValue || title.length < 1 || contentValue <= 1) {
    return NextResponse.json({ error: '제출 형식이 잘못되었어요' }, { status: 400 })
  }

  //악성 스크립트 주입 방지
  const sanitizedContent = sanitizeHtml(content)

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

        const res = await fetch('https://xqxurjr5cl.execute-api.ap-northeast-2.amazonaws.com/20230810/lvd', {
          method: 'POST',
          body: JSON.stringify({ title, content: sanitizedContent, user_id, verified }),
        })

        if (res.ok) {
          // const data = await res.json()
          // const boardId = data.boardId

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
