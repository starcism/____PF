'use client'

import NoticeBoardHeader from '@/components/organisms/NoticeBoardHeader'
import PostItem from '@/components/organisms/PostItem'
import { freeData } from '@/pages/api/board/free'
import { IBoard } from '@/types/types'
import React, { Suspense } from 'react'

export default function Page() {
  // const res = await fetch('http://3.144.135.69/v1/api/board/free', { method: 'GET' })
  // const postData = await res.json()
  const postData = freeData
  return (
    <>
      <NoticeBoardHeader />
      <div className="bg-white z-[1]">
        <Suspense fallback={<div>로딩중</div>}>
          {postData &&
            postData.list.map((post:IBoard, index:number) => (
              <PostItem
                key={index}
                boardid={post.boardid}
                title={post.title}
                view={post.view}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                createdAt={post.createdAt}
              />
            ))}
        </Suspense>
      </div>
    </>
  )
}
