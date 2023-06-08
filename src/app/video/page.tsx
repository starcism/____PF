import NoticeBoardHeader from '@/components/organisms/NoticeBoardHeader'
import VideoCard from '@/components/organisms/VideoCard'
import VideoBoardLayout from '@/components/templates/VideoBoardLayout'
import { getData } from '@/libs/getData'
import { IVideoBoard } from '@/types/types'
import React, { Suspense } from 'react'

export default async function Page() {
  const postData = await getData('/api/board/video', { method: 'GET' })
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
