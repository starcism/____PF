'use client'

import React from 'react'
import { PhotoBoard } from '@/types/types'
import PhotoCard from '@/components/organisms/PhotoCard'
import BoardNotice from '@/components/organisms/NoticeBoardHeader'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import useUserId from '@/libs/useUserId'
import useBoard from '@/libs/useBoard'
import BoardLayout from '@/components/templates/BoardLayout'

export default function Page() {
  const { postData, loading, totalPage } = useBoard('photo', 1)
  const { accessToken, UID, isLoading } = useUserId()

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
      <BoardLayout>
        {postData ? (
          postData.posts.map((post: PhotoBoard, index: number) =>
            post.deleted_at === null ? (
              <div key={index}>
                <PhotoCard
                  boardType="photo"
                  userId={post.user_id}
                  photoUrls={post.photo_url}
                  boardId={post.board_id}
                  title={post.title}
                  view={post.view}
                  createdAt={post.created_at}
                  nickname={post.nickname}
                  liked={post.liked}
                  commentCount={post.comment_count}
                  tag={post.tag}
                  postTag={post.post_tag}
                  accessToken={accessToken as string | null}
                  UID={UID as number | null}
                />
              </div>
            ) : (
              <></>
            ),
          )
        ) : (
          <div className="w-full h-[200px] text-gray-3 flex justify-center items-center">게시물 없음</div>
        )}
      </BoardLayout>
    </>
  )
}
