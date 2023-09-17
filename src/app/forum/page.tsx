'use client'

import React, { Suspense } from 'react'
import { Board } from '@/types/types'
import PostItem from '@/components/organisms/PostItem'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import BoardNotice from '@/components/organisms/NoticeBoardHeader'
import useBoard from '@/libs/useBoard'

export default function Page() {
  const { postData, loading, totalPage } = useBoard('forum', 1)

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  }

  return (
    <>
      <BoardNotice />
      {postData ? (
        postData.posts.map((post: Board, index: number) =>
          post.deleted_at === null ? (
            <PostItem
              key={index}
              boardid={post.board_id}
              title={post.title}
              view={post.view}
              likeCount={post.liked}
              commentCount={post.comment_count}
              createdAt={post.created_at}
              updatedAt={post.updated_at}
              nickname={post.nickname}
            />
          ) : (
            <></>
          ),
        )
      ) : (
        <div className="w-full h-[200px] text-gray-3 flex justify-center items-center">게시물 없음</div>
      )}
      <Suspense fallback={<></>}></Suspense>
    </>
  )
}
