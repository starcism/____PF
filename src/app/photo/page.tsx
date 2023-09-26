'use client'

import React from 'react'
import { PhotoBoard } from '@/types/types'
import PhotoCard from '@/components/organisms/PhotoCard'
import BoardNotice from '@/components/organisms/BoardNotice'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import useBoard from '@/libs/useBoard'
import BoardLayout from '@/components/templates/BoardLayout'
import { useUserState } from '@/libs/UserProvider'

export default function Page() {
  const { postData, loading, totalPage } = useBoard('photo', 1)
  const { accessToken, userId, isLoading } = useUserState()

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
              <div key={index} className="w-[100vw] max-w-[430px] px-[15px] sm:px-[0px] sm:mx-[auto] md:max-w-[354px]">
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
                  userLike={post.user_like}
                  commentCount={post.comment_count}
                  tag={post.tag}
                  postTag={post.post_tag}
                  accessToken={accessToken as string | null}
                  UID={userId as number | null}
                />
              </div>
            ) : (
              <div key={index}></div>
            ),
          )
        ) : (
          <div className="w-[100vw] max-w-[768px] h-[200px] text-gray-3 flex justify-center items-center select-none">게시물 없음</div>
        )}
      </BoardLayout>
    </>
  )
}
