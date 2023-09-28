'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { Board } from '@/types/types'
import PostItem from '@/components/organisms/PostItem'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import BoardNotice from '@/components/organisms/BoardNotice'
import useBoard from '@/libs/useBoard'
import useObserver from '@/libs/useObserver'
import Observer from '@/components/organisms/Observer'

export default function Page() {
  const { postData, loading, totalPage, next, isLastPage } = useBoard('forum', 1)
  const [nextData, setData] = useState<any[] | null>([])

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  }

  return (
    <>
      <div className='min-h-[100vh]'>
        <BoardNotice />
        {postData ? (
          postData.posts.map((post: Board, index: number) =>
            post.deleted_at === null && (
              <PostItem
                key={index}
                boardid={post.board_id}
                title={post.title}
                view={post.view}
                likeCount={post.liked}
                commentCount={post.comment_count}
                createdAt={post.created_at}
                updatedAt={post.updated_at}
                nickname={post.nickname}
                icon={post.icon}
              />
            )
          )
        ) : (
          <div className="w-[100vw] max-w-[768px] h-[200px] text-gray-3 flex justify-center items-center select-none">게시물 없음</div>
        )}
        {nextData &&
          nextData.map((post: Board, index: number) =>
            post.deleted_at === null ? (
              <PostItem
                key={index + 20}
                boardid={post.board_id}
                title={post.title}
                view={post.view}
                likeCount={post.liked}
                commentCount={post.comment_count}
                createdAt={post.created_at}
                updatedAt={post.updated_at}
                nickname={post.nickname}
                icon={post.icon}
              />
            ) : (
              <></>
            ),
          )}
      </div>
      {!isLastPage && <Observer prev={nextData} totalPages={totalPage} boardType="forum" next={next} setNextData={setData} />}
    </>
  )
}
