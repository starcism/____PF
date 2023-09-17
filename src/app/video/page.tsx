'use client'

import NoticeBoardHeader from '@/components/organisms/NoticeBoardHeader'
import VideoCard from '@/components/organisms/VideoCard'
import BoardLayout from '@/components/templates/BoardLayout'
import useBoard from '@/libs/useBoard'
import useUserId from '@/libs/useUserId'
import { VideoBoard } from '@/types/types'
import React from 'react'

export default function Page() {
  const { postData, loading, totalPage } = useBoard('video', 1)
  const { accessToken, UID, isLoading } = useUserId()

  return (
    <>
      <NoticeBoardHeader />
      <BoardLayout>
        {postData ? (
          postData.posts.map((post: VideoBoard, index: number) =>
            post.deleted_at === null ? (
              <div key={index}>
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
