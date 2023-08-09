import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const title = formData.get('title')
  const content = formData.get('content')
  return NextResponse.json({ title, content })
}
