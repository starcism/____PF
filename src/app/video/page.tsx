'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import NoticeBoardHeader from '@/components/organisms/BoardNotice'
import Observer from '@/components/organisms/Observer'
import VideoCard from '@/components/organisms/VideoCard'
import BoardLayout from '@/components/templates/BoardLayout'
import { useUserState } from '@/libs/UserProvider'
import useBoard from '@/libs/useBoard'
import { VideoBoard } from '@/types/types'
import React, { useState } from 'react'

export default function Page() {
  const { postData, loading, totalPage, next, isLastPage } = useBoard('video', 1)
  const { accessToken, userId, isLoading } = useUserState()
  const [nextData, setData] = useState<any[] | null>([])

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  }

  return (
    <>
      <NoticeBoardHeader />
      <BoardLayout>
        {postData ? (
          postData.posts.map((post: VideoBoard, index: number) =>
            post.deleted_at === null && (
              <div key={index} className="w-[100vw] max-w-[430px] px-[15px] sm:px-[0px] sm:mx-[auto] md:max-w-[354px]">
                <VideoCard
                  boardType="photo"
                  userId={post.user_id}
                  youtubeUrl={post.youtube_url}
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
            )
          )
        ) : (
          <div className="w-[100vw] max-w-[768px] h-[200px] text-gray-3 flex justify-center items-center select-none">게시물 없음</div>
        )}
        {nextData &&
          nextData.map((post: VideoBoard, index: number) =>
            post.deleted_at === null ? (
              <div key={index + 10} className="w-[100vw] max-w-[430px] px-[15px] sm:px-[0px] sm:mx-[auto] md:max-w-[354px]">
                <VideoCard
                  boardType="photo"
                  userId={post.user_id}
                  youtubeUrl={post.youtube_url}
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
              <></>
            ),
          )}
      </BoardLayout>
      {!isLastPage && <Observer prev={nextData} totalPages={totalPage} boardType="video" next={next} setNextData={setData} userId={userId} />}
    </>
  )
}
