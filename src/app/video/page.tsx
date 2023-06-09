import NoticeBoardHeader from '@/components/organisms/NoticeBoardHeader'
import VideoCard from '@/components/organisms/VideoCard'
import VideoBoardLayout from '@/components/templates/VideoBoardLayout'
import { videoData } from '@/pages/api/board/video'
import { IVideoBoard } from '@/types/types'
import React, { Suspense } from 'react'

export default function Page() {
  // const res = await fetch('http://localhost:3000/api/board/video', { method: 'GET' })
  // const postData = await res.json()
  const postData = videoData
  return (
    <>
      <NoticeBoardHeader />
      <VideoBoardLayout>
        <Suspense fallback={<div>로딩중</div>}>
          {postData &&
            postData.list.map((post: IVideoBoard, index: number) => (
              <VideoCard
                key={index}
                href={`/video/${post.boardid}`}
                url={post.youtubeUrl}
                title={post.title}
                view={post.view}
                createdAt={post.createdAt}
                nickname={post.user.nickname}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
              />
            ))}
        </Suspense>
      </VideoBoardLayout>
    </>
  )
}
