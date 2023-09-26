import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const verified = process.env.VERIFYING_KEY

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const boardId = searchParams.get('boardId')
  let accessToken = headers().get('Authorization')
  let userId = null

  try {
    if (accessToken) {
      const verifyingRes = await fetch('https://6ietu7gzmk.execute-api.ap-northeast-2.amazonaws.com/20230717/v0', {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ verified }),
      })
      if (verifyingRes.ok) {
        const verifyingData = await verifyingRes.json()
        userId = verifyingData.userId
      }
    }

    const url = userId
      ? `https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/free/info?boardId=${boardId}&userId=${userId}`
      : `https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/free/info?boardId=${boardId}`

    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    })

    if (res.status === 200) {
      const { userLike, comments } = await res.json()
      return NextResponse.json({ userLike, comments })
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
