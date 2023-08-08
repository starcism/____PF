import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('title')
  const email = formData.get('content')
  return NextResponse.json({ name, email })
}
