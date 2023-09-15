'use client'

import React from 'react'
import PhotoBoardLayout from '@/components/templates/PhotoBoardLayout'
import { PhotoBoard } from '@/types/types'
import PhotoCard from '@/components/organisms/PhotoCard'
import BoardNotice from '@/components/organisms/NoticeBoardHeader'
import usePhotoBoard from '@/libs/usePhotoBoard'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'

export default function Page() {
  const { postData, loading, totalPage } = usePhotoBoard(1)

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
      <PhotoBoardLayout>
        {postData ? (
          postData.posts.map((post: PhotoBoard, index: number) => (
            <PhotoCard
              key={index}
              photoUrls={post.photo_url}
              href={`/photo/${post.board_id}`}
              title={post.title}
              view={post.view}
              createdAt={post.created_at}
              nickname={post.nickname}
              liked={post.liked}
              commentCount={post.comment_count}
              tag={post.tag}
              postTag={post.post_tag}
            />
          ))
        ) : (
          <div className="w-full h-[200px] text-gray-3 flex justify-center items-center">게시물 없음</div>
        )}
      </PhotoBoardLayout>
    </>
  )
}
