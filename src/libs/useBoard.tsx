'use client'

import { useEffect, useState } from 'react'
import checkEnvironment from './checkEnvironment'
import { useUserState } from './UserProvider'

export default function useBoard(boardType: string, pageIndex: number) {
  const [postData, setPostData] = useState<any>(null)
  const [totalPage, setTotalPage] = useState(0)
  const [isLastPage, setLastPage] = useState(false)
  const [next, setNext] = useState(0)
  const [loading, setLoading] = useState(true)
  const { accessToken, userId, isLoading } = useUserState()

  const getPost = async (pageIndex: number) => {
    const fetchUrl =
      boardType === 'forum'
        ? `/api/board/forum?pageIndex=${pageIndex}`
        : boardType === 'photo'
        ? `/api/board/photo?pageIndex=${pageIndex}&userId=${userId}`
        : `/api/board/video?pageIndex=${pageIndex}&userId=${userId}`

    try {
      const res = await fetch(checkEnvironment().concat(fetchUrl), {
        method: 'GET',
        cache: 'no-store',
      })
      if (res.status === 200) {
        if (boardType === 'forum') {
          const { posts, totalPages, isLastPage, next } = await res.json()
          const data = { posts, totalPages }
          setPostData(data)
          setTotalPage(totalPages)
          setLastPage(isLastPage)
          setNext(next)
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
        const errors = await res.json()
        return null
      }
    } catch (error) {
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      getPost(pageIndex)
    }
  }, [pageIndex, isLoading])

  return { postData, loading, totalPage, isLastPage, next }
}
