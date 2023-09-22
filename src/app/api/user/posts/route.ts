import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  const { userId, boardType } = await request.json()

  if (userId && boardType) {
    try {
      const res = await fetch(`https://9z05g5impf.execute-api.ap-northeast-2.amazonaws.com/20230921/info?userId=${userId}&boardType=${boardType}`, {
        method: 'GET',
        next: {
          revalidate: 15,
        },
      })
      if (res.status === 200) {
        const { data } = await res.json()

        return NextResponse.json({ data })
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
  }
}
