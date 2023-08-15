import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const verified = process.env.VERIFYING_KEY

const allowedTags = [
  'strong',
  'em',
  'u',
  's',
  'p',
  'div',
  'span',
  'ul',
  'ol',
  'li',
  'br',
  'a',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
];

function sanitizeHtml(inputHtml: string) {
  const cleanedHtml = inputHtml.replace(/<\/?[^>]+(>|$)/g, (tag) => {
    const tagName = tag.replace(/[<\/>]/g, '').toLowerCase();
    if (allowedTags.includes(tagName)) {
      return tag;
    }
    return '';
  });

  return cleanedHtml;
}

export async function POST(request: Request) {
  let accessToken = headers().get('Authorization')
  const { title, content } = await request.json()

  //유효성 검사
  if (!title || !content || title.length < 1 || content.length < 1) {
    return NextResponse.json({ error: '제출 형식이 잘못되었어요' }, { status: 400 })
  }

  //악성 스크립트 주입 방지
  const sanitizedContent = sanitizeHtml(content);

  if (accessToken) {
    try {
      const verifyingRes = await fetch('https://6ietu7gzmk.execute-api.ap-northeast-2.amazonaws.com/20230717/v0', {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ verified })
      })
      if (verifyingRes.ok) {
        const verifyingData = await verifyingRes.json()
        const user_id = verifyingData.userId

        const res = await fetch('https://xqxurjr5cl.execute-api.ap-northeast-2.amazonaws.com/20230810/lvd', {
          method: 'POST',
          body: JSON.stringify({ title, content: sanitizedContent, user_id, verified }),
        })

        if (res.ok) {
          const data = await res.json()
          return NextResponse.json({ data })
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
