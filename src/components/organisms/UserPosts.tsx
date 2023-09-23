'use client'

import checkEnvironment from '@/libs/checkEnvironment'
import { useEffect, useState } from 'react'

interface Props {
  accessToken: string
  userId: number
}

export default function UserPosts({ accessToken, userId }: Props) {
  const [boardType, setBoardType] = useState<string>('forum')
  const [posts, setPosts] = useState<any>(null)

  const fetchData = async () => {
    try {
      const res = await fetch(checkEnvironment().concat('/api/user/posts'), {
        method: 'POST',
        body: JSON.stringify({ userId, boardType }),
      })

      if (res.ok) {
        const { data } = await res.json()
        setPosts(data)
        console.log(data)
      } else {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [boardType])

  return (
    <>
      <div></div>
    </>
  )
}
