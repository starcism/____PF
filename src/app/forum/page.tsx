import NoticeBoardHeader from '@/components/organisms/NoticeBoardHeader'
import React, { Suspense } from 'react'
import checkEnvironment from '@/libs/checkEnvironment'
import { IBoard } from '@/types/types'
import PostItem from '@/components/organisms/PostItem'

async function getPost(pageIndex: number) {
  try {
    const res = await fetch(checkEnvironment().concat(`/api/board/forum?pageIndex=${pageIndex}`), {
      method: 'GET',
      cache: 'no-store'
    })
    if (res.status === 200) {
      const { posts, totalPages } = await res.json()
      return { posts, totalPages }
    } else if (res.status === 204) {
      return { posts: undefined }
    } else {
      return { posts: undefined }
    }
  } catch (error) {
    console.log(error)
    return { posts: undefined }
  }
}

export default async function Page() {
  const { posts, totalPages } = await getPost(1)
  // console.log('posts:', posts)
  // const nextPosts = await getPost(2)
  // const nextData = nextPosts.posts

  return (
    <>
      <div className="bg-white z-[1]">
        <NoticeBoardHeader />
        {posts &&
          posts.map((post: IBoard, index: number) => (
            <PostItem
              key={index}
              boardid={post.board_id}
              title={post.title}
              view={post.view}
              likeCount={post.liked}
              commentCount={post.comment_count}
              createdAt={post.created_at}
              updatedAt={post.updated_at}
            />
          ))}
        <Suspense fallback={<></>}></Suspense>
      </div>
    </>
  )
}
