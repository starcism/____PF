'use client'

import { useCallback, useEffect, useState } from 'react'
import checkEnvironment from './checkEnvironment'
import { IFreePost } from '@/types/types'

export default function usePost(boardId: string) {
  const [post, setPost] = useState<IFreePost | null>(null)

  const getPost = useCallback(async (boardId: string) => {
    try {
      const res = await fetch(checkEnvironment().concat(`/api/board/forum?boardId=${boardId}`), {
        method: 'GET',
        cache: 'no-store',
      })
      if (res.status === 200) {
        const data = await res.json()
        setPost(data.post)

      } else if (res.status === 204) {
        return null
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getPost(boardId)
    
  }, [getPost, boardId])

  return { post }
}
