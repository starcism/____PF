import { verifyToken } from '@/libs/verifyToken'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

const secretKey = process.env.TOKEN_SECRET_KEY!

export async function POST(request: Request) {
  let cookie = cookies().get('refreshToken')
  const refreshToken = cookie?.value
  let accessToken = ''
  if (refreshToken) {
    accessToken = 'tokenvalue'
  }

  return NextResponse.json({ status:200, message:"성공", headers: { Authorization: accessToken }, body:{refreshToken} })
}