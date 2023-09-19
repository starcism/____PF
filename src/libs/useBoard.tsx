'use client'

import { useCallback, useEffect, useState } from 'react'
import checkEnvironment from './checkEnvironment'
import { ForumData, PhotoBoardData, VideoBoardData } from '@/types/types'

export default function useBoard(boardType: string, pageIndex: number) {
  const [postData, setPostData] = useState<any>(null)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const fetchUrl =
    boardType === 'forum'
      ? `/api/board/forum?pageIndex=${pageIndex}`
      : boardType === 'photo'
      ? `/api/board/photo?pageIndex=${pageIndex}`
      : `/api/board/video?pageIndex=${pageIndex}`

  const getPost = useCallback(async (pageIndex: number) => {
    try {
      const res = await fetch(checkEnvironment().concat(fetchUrl), {
        method: 'GET',
        cache: 'no-store',
      })
      if (res.status === 200) {
        if (boardType === 'forum') {
          const { posts, totalPages } = await res.json()
          const data = { posts, totalPages }
          setPostData(data)
          setTotalPage(totalPages)
        } else if (boardType === 'photo') {
          const { photoUrls, posts, totalPages } = await res.json()
          const data = { photoUrls, posts }
          setPostData(data)
          setTotalPage(totalPages)
        } else if (boardType === 'video') {
          const { posts, totalPages } = await res.json()
          const data = { posts, totalPages }
          setPostData(data)
          setTotalPage(totalPages)
        }
      } else if (res.status === 204) {
        return null
      } else {
        return null
      }
    } catch (error) {
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getPost(pageIndex)
    return () => {
      setLoading(true)
      setPostData(null)
    }
  }, [getPost, pageIndex])

  return { postData, loading, totalPage }
}
