import FreeBoard from '@/components/organisms/FreeBoard'
import PostLayout from '@/components/templates/PostLayout'
import checkEnvironment from '@/libs/checkEnvironment'
import React, { Suspense } from 'react'

type TProps = {
  params: {
    id: string
  }
}

interface Props {
  user: {
    userId: number
    profileImage?: string
    nickname: string
  }

  title: string
  content: string
  commentCount: number
  liked: number
  view: number
  createdAt: string
}

async function getPost(boardId: string) {
  try {
    const res = await fetch(checkEnvironment().concat(`/api/board/forum?boardId=${boardId}`), {
      method: 'GET',
      cache: 'no-store',
    })
    if (res.status === 200) {
      const data = await res.json()
      return { postData: data.post, deleted: false }
    } else if (res.status === 204) {
      return { postData: null, deleted: true }
    } else {
      return { postData: null, deleted: false, error: true }
    }
  } catch (error) {
    console.log(error)
    return { postData: null, deleted: false, error: true }
  }
}

export default async function Page(props: TProps) {
  const boardId = props.params.id
  const { postData, deleted } = await getPost(boardId)
  const post = postData ? postData.post : null

  return (
    <>
      <Suspense fallback={<></>}>
        <PostLayout boardType="포럼">
          {post && (
            <FreeBoard
              boardId={boardId}
              nickname={post.nickname}
              title={post.title}
              content={post.content}
              commentCount={post.comment_count}
              liked={post.liked}
              view={post.view}
              createdAt={post.created_at}
              updatedAt={post.updated_at}
            />
          )}
        </PostLayout>
      </Suspense>
    </>
  )
}
