'use client'

import NoticeBoardHeader from '../organisms/NoticeBoardHeader'
import PostItem from '../organisms/PostItem'
import { useEffect, useState } from 'react'
import { IFreePost } from '@/types/types'

export default function FreeBoard() {
  const [postData, setPostData] = useState<IFreePost>({
    list: [],
    listTotalPage: 0,
    listTotalCount: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/board/free?page=1&pagesize=20&hot=10')
        const data = await response.json()
        setPostData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <NoticeBoardHeader />
      <div className="bg-white z-[1]">
        {postData &&
          postData.list.map((post, index) => (
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
      </div>
    </>
  )
}
