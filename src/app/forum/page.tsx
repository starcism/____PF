'use client'

import NoticeBoardHeader from '@/components/organisms/NoticeBoardHeader'
import PostItem from '@/components/organisms/PostItem'
import { IBoard } from '@/types/types'
import React, { Suspense } from 'react'

export default function Page() {
  // const res = await fetch('http://3.144.135.69/v1/api/board/free', { method: 'GET' })
  // const postData = await res.json()
  const postData = {
    list: [
      {
        boardid: 1,
        category: 'forum',
        title: '첫 글',
        view: 10000,
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
      <div className="bg-white z-[1]">
        <Suspense fallback={<div>로딩중</div>}>
          {postData &&
            postData.list.map((post: IBoard, index: number) => (
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
