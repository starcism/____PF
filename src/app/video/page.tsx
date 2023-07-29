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
        boardid: 1,
        category: 'photo',
        youtubeUrl: '',
        title: '#풍경',
        view: 430,
        createdAt: '2023-06-01T19:43:18.576Z',
        user: {
          userid: 1,
          profile_image: 'https://avatars.githubusercontent.com/u/76847245?v=4',
          nickname: 'SWITHy',
        },
        likeCount: 100,
        commentCount: 1,
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
