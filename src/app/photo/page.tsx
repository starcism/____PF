import NoticeBoardHeader from '@/components/organisms/NoticeBoardHeader'
import React, { Suspense } from 'react'
import PhotoBoardLayout from '@/components/templates/PhotoBoardLayout'
import { IPhotoBoard } from '@/types/types'
import PhotoCard from '@/components/organisms/PhotoCard'
import { photoData } from '@/pages/api/board/photo'

export default function Page() {
  // const res = await fetch('http://localhost:3000/api/board/photo', { method: 'GET' })
  // const postData = await res.json()
  const postData = photoData
  return (
    <>
      <NoticeBoardHeader />
      <PhotoBoardLayout>
        <Suspense fallback={<div>로딩중</div>}>
          {postData &&
            postData.list.map((post:IPhotoBoard, index:number) => (
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
