'use client'

import checkEnvironment from '@/libs/checkEnvironment'
import { useCallback, useState } from 'react'

interface Props {
  accessToken: string
  userId: string
}

export default function UserPosts({ accessToken, userId }: Props) {
  const [boardType, setBoardType] = useState<string>('forum')

  const fetchData = useCallback(async () => {
    try {
      const data = await fetch(checkEnvironment().concat('/api/user/posts'), {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`
        },
        body: JSON.stringify({ userId, boardType })
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return <></>
}
