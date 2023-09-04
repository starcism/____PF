import React, { Suspense } from 'react'
import PhotoBoardLayout from '@/components/templates/PhotoBoardLayout'
import { IPhotoBoard } from '@/types/types'
import PhotoCard from '@/components/organisms/PhotoCard'
import BoardNotice from '@/components/organisms/NoticeBoardHeader'

export default function Page() {
  // const res = await fetch('http://127.0.0.1/api/board/photo', { method: 'GET' })
  // const postData = await res.json()
  const postData = {
    list: [
      {
        board_id: 1,
        category: 'photo',
        images: ['/images/1.jpeg'],
        title: '#풍경',
        view: 430,
        created_at: '2023-06-01T19:43:18.576Z',
        user_id: 1,
        nickname: '관리자',
        liked: 100,
        comment_count: 1,
      },
    ],
    listTotalPage: 1,
    listTotalCount: 6,
  }

  return (
    <>
      <BoardNotice />
      <PhotoBoardLayout>
        <Suspense fallback={<div>로딩중</div>}>
          {postData &&
            postData.list.map((post: IPhotoBoard, index: number) => (
              <PhotoCard
                key={index}
                images={post.images}
                href={`/photo/${post.board_id}`}
                title={post.title}
                view={post.view}
                createdAt={post.created_at}
                nickname={post.nickname}
                likeCount={post.liked}
                commentCount={post.comment_count}
              />
            ))}
        </Suspense>
      </PhotoBoardLayout>
    </>
  )
}
