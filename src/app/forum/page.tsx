'use client'

import React, { Suspense } from 'react'
import { IBoard } from '@/types/types'
import PostItem from '@/components/organisms/PostItem'
import useForum from '@/libs/useForum'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import BoardNotice from '@/components/organisms/NoticeBoardHeader'

export default function Page() {
  const { postData, loading, totalPage } = useForum(1)

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
        postData.posts.map((post: IBoard, index: number) => (
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
        ))
      ) : (
        <div className="w-full h-[200px] text-gray-3 flex justify-center items-center">게시물 없음</div>
      )}
      <Suspense fallback={<></>}></Suspense>
    </>
  )
}
