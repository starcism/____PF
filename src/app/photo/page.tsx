import NoticeBoardHeader from '@/components/organisms/NoticeBoardHeader'
import React, { Suspense } from 'react'
import PhotoBoardLayout from '@/components/templates/PhotoBoardLayout'
import { IPhotoBoard } from '@/types/types'
import PhotoCard from '@/components/organisms/PhotoCard'

export default function Page() {
  // const res = await fetch('http://127.0.0.1/api/board/photo', { method: 'GET' })
  // const postData = await res.json()
  const postData = {
    list: [
      {
        boardid: 1,
        category: 'photo',
        images: ['/images/liz.jpeg'],
        title: '#풍경',
        view: 430,
        createdAt: '2023-06-01T19:43:18.576Z',
        user: {
          userid: 1,
          profile_image: 'https://avatars.githubusercontent.com/u/76847245?v=4',
          nickname: '관리자',
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
      <PhotoBoardLayout>
        <Suspense fallback={<div>로딩중</div>}>
          {postData &&
            postData.list.map((post: IPhotoBoard, index: number) => (
              <PhotoCard
                key={index}
                images={post.images}
                href={`/photo/${post.boardid}`}
                title={post.title}
                view={post.view}
                createdAt={post.createdAt}
                nickname={post.user.nickname}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
              />
            ))}
        </Suspense>
      </PhotoBoardLayout>
    </>
  )
}
