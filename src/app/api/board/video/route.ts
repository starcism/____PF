import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const verified = process.env.VERIFYING_KEY

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const pageIndex = searchParams.get('pageIndex')
  const userId = searchParams.get('userId')
  const req = searchParams.get('req')
  const total = searchParams.get('total')
  // const boardId = searchParams.get('boardId')

  if (pageIndex) {
    try {
      const res = await fetch(`https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/board/video?pageIndex=${pageIndex}&userId=${userId}&req=${req}&total=${total}`, {
        method: 'GET',
        cache: 'no-store',
      })
      if (res.status === 200) {
        const { posts, totalPages, isLastPage, next } = await res.json()

        return NextResponse.json({ posts, totalPages, isLastPage, next })
      } else if (res.status === 204) {
        return NextResponse.json({ message: '게시물 없음' }, { status: 204 })
      } else {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    // try {

    //   const res = await fetch(`https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/free?boardId=${boardId}`, {
    //     method: 'GET',
    //     next: {
    //       revalidate: 10,
    //     }
    //   })

    //   if (res.status === 200) {
    //     const { post } = await res.json()

    //     return NextResponse.json({ post })
    //   } else if (res.status === 204) {
    //     return NextResponse.json({ message: '삭제된 게시물입니다.' }, { status: 204 })
    //   } else {
    //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    //   }
    // } catch (error) {
    //   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    // }
  }
}

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  const { title, youtubeUrl, tag, postTag } = await request.json()

  //유효성 검사
  if (
    !title ||
    !youtubeUrl ||
    !tag ||
    typeof tag !== 'string' ||
    tag.length !== 6 ||
    !postTag ||
    typeof postTag !== 'string' ||
    title.length < 1 ||
    title.length > 100
  ) {
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
        const userId = verifyingData.userId

        const res = await fetch('https://i4p3wlgy1l.execute-api.ap-northeast-2.amazonaws.com/20230917/lvd', {
          method: 'POST',
          body: JSON.stringify({ userId, title, youtubeUrl, tag, postTag, verified }),
        })

        if (res.ok) {
          return NextResponse.json({ message: '글쓰기를 완료했어요' }, { status: 200 })
        } else {
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 401 })
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

export async function PUT(request: Request) {
  let accessToken = headers().get('Authorization')
  const { boardId } = await request.json()

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
        const res = await fetch('https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/video', {
          method: 'PUT',
          body: JSON.stringify({ boardId, userId: user_id }),
        })

        if (res.ok) {
          return NextResponse.json({ message: '게시글을 삭제했어요' }, { status: 200 })
        } else {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 500 })
        }
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
