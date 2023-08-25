'use client'

import { useCallback, useEffect, useState } from "react"
import checkEnvironment from "./checkEnvironment"
import { IFreeBoard } from "@/types/types"

export default function useForum(pageIndex: number) {

  const [postData, setPostData] = useState<IFreeBoard | null>(null)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(true)

  const getPost = useCallback(async (pageIndex: number) => {
    try {
      const res = await fetch(checkEnvironment().concat(`/api/board/forum?pageIndex=${pageIndex}`), {
        method: 'GET',
        cache: 'no-store',
      })
      if (res.status === 200) {
        const { posts, totalPages } = await res.json()
        const data = { posts, totalPages }
        setPostData(data)
        setTotalPage(totalPages)

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
  }, [getPost, pageIndex])

  return { postData, loading, totalPage }
}
