import NoticeBoardHeader from '@/components/organisms/NoticeBoardHeader'
import VideoCard from '@/components/organisms/VideoCard'
import VideoBoardLayout from '@/components/templates/VideoBoardLayout'
import { IVideoBoard } from '@/types/types'
import React, { Suspense } from 'react'

export default function Page() {
  // const res = await fetch('http://localhost:3000/api/board/video', { method: 'GET' })
  // const postData = await res.json()
  const postData = {
    list: [
      {
        board_id: 1,
        category: 'photo',
        youtubeUrl: '',
        title: '#풍경',
        view: 430,
        created_at: '2023-06-01T19:43:18.576Z',
        nickname: '관리자',
        user_id: '1',
        liked: 100,
        comment_count: 1,
      },
    ],
    listTotalPage: 1,
    listTotalCount: 6,
  }
  return (
    <>
      <NoticeBoardHeader />
      <VideoBoardLayout>
        <Suspense fallback={<div>로딩중</div>}>
          {postData &&
            postData.list.map((post: IVideoBoard, index: number) => (
              <VideoCard
                key={index}
                href={`/video/${post.board_id}`}
                url={post.youtubeUrl}
                title={post.title}
                view={post.view}
                createdAt={post.created_at}
                nickname={post.nickname}
                likeCount={post.liked}
                commentCount={post.comment_count}
              />
            ))}
        </Suspense>
      </VideoBoardLayout>
    </>
  )
}
