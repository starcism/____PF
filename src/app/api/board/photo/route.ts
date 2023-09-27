import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const verified = process.env.VERIFYING_KEY

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  // const path = request.nextUrl.pathname
  const pageIndex = searchParams.get('pageIndex')
  const userId = searchParams.get('userId')
  const boardId = searchParams.get('boardId')
  const req = searchParams.get('req')
  const total = searchParams.get('total')
  const keyW = searchParams.get('kw')
  const keyX = searchParams.get('kx')
  const keyY = searchParams.get('ky')
  const keyZ = searchParams.get('kz')

  const kw = keyW ? `&kw=${keyW}` : '&kw='
  const kx = keyX ? `&kx=${keyX}` : ''
  const ky = keyY ? `&ky=${keyY}` : ''
  const kz = keyZ ? `&kz=${keyZ}` : ''

  if (pageIndex) {
    try {
      // revalidatePath(path)

      const res = await fetch(`https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/board/photo?pageIndex=${pageIndex}&userId=${userId}&req=${req}&total=${total}`, {
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
    try {
      const res = await fetch(`https://0lky4v3m2f.execute-api.ap-northeast-2.amazonaws.com/20230915/getobj?boardId=${boardId}${kw}${kx}${ky}${kz}`, {
        method: 'GET',
        cache: 'no-store',
      })
      if (res.status === 200) {
        const { signatureUrls } = await res.json()
        // const data = await res.json()
        return NextResponse.json({ signatureUrls })
      } else {
        const data = await res.json()
        return NextResponse.json({ error: 'Internal Server Error', data }, { status: 500 })
      }
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }
}

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')

  const formData = await request.formData()
  const files = formData.getAll('images')
  const extensions = formData.getAll('extensions')
  const title = formData.get('title')?.toString()
  const tag = formData.get('tag')?.toString()
  const postTag = formData.get('postTag')?.toString()

  //유효성 검사
  if (!title || title.length < 1 || title.length > 100) {
    return NextResponse.json({ error: '제출 형식이 잘못되었어요' }, { status: 400 })
  }

  if (accessToken) {
    try {
      const verifyingReq = fetch('https://6ietu7gzmk.execute-api.ap-northeast-2.amazonaws.com/20230717/v0', {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ verified }),
      })

      const signatureReq = fetch('https://0lky4v3m2f.execute-api.ap-northeast-2.amazonaws.com/20230915/putobj', {
        method: 'POST',
        body: JSON.stringify({ extensions, verified }),
      })

      const [verifyingRes, signatureRes] = await Promise.all([verifyingReq, signatureReq])

      if (verifyingRes.ok && signatureRes.ok) {
        const { signatures, imageKeys } = await signatureRes.json()

        if (!signatures || signatures.length === 0) {
          return NextResponse.json({ error: '이미지 등록 실패' }, { status: 500 })
        }

        const verifyingData = await verifyingRes.json()
        const userId = verifyingData.userId

        const dbReq = await fetch('https://uq8hvp2my8.execute-api.ap-northeast-2.amazonaws.com/20230907/lvd', {
          method: 'POST',
          body: JSON.stringify({ title, tag, postTag, userId, imageKeys, verified }),
        })

        const uploadToS3Promises = signatures.map(async (signature: string, index: number) => {
          return fetch(signature, {
            method: 'PUT',
            body: files[index],
          })
        })

        const [dbRes, ...res] = await Promise.all([dbReq, ...uploadToS3Promises])

        if (dbRes.ok) {
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
        const res = await fetch('https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/photo', {
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
