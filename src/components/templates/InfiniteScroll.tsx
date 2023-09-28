'use client'

import NoticeBoardHeader from '@/components/organisms/BoardNotice'
import PostItem from '@/components/organisms/PostItem'
import { Board } from '@/types/types'
import React, { Suspense, useEffect, useState } from 'react'

async function getPost(pageIndex: number) {
  try {
    const res = await fetch(`https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/board/free?pageIndex=${pageIndex}`, {
      method: 'GET',
      cache: 'no-store',
    })
    if (res.status === 200) {
      const { posts, totalPages } = await res.json()
      return { posts, totalPages }
    } else if (res.status === 204) {
      return { posts: undefined }
    } else {
      return { posts: undefined }
    }
  } catch (error) {
    return { posts: undefined }
  }
}

export default function InfiniteScroll({ next }: { next: Board[] }) {
  const [postData, setPostData] = useState<Board[]>(next)
  const [pageIndex, setPageIndex] = useState<number>(3)

  // 데이터를 불러오는 함수
  const loadNextPosts = async () => {
    const nextPosts = await getPost(pageIndex + 1)
    if (nextPosts && nextPosts.posts) {
      setPostData((prevData) => [...prevData, ...nextPosts.posts])
      setPageIndex(pageIndex + 1)
    }
  }

  useEffect(() => {
    // Intersection Observer를 이용하여 스크롤 이벤트 감지
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPosts()
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 },
    )

    const sentinel = document.getElementById('sentinel') // sentinel 엘리먼트 선택
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => {
      observer.disconnect()
    }
  }, [pageIndex])

  return (
    <div className="bg-white z-[1]">
      <Suspense fallback={<div>로딩중</div>}>
        {postData.map((post: Board, index: number) => (
          <PostItem
            key={index}
            boardid={post.board_id}
            title={post.title}
            view={post.view}
            likeCount={post.liked}
            commentCount={post.comment_count}
            createdAt={post.created_at}
            updatedAt={post.updated_at}
          />
        ))}
      </Suspense>
      <div id="sentinel" style={{ position: 'relative', height: '1px' }}></div>
      {/* sentinel 엘리먼트를 하단에 추가하여 Intersection Observer를 활용 */}
    </div>
  )
}
