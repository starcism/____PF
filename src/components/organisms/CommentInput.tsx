'use client'

import { useState } from 'react'
import UserComment from '../molecules/UserComment'
import { useRouter } from 'next/navigation'
import checkEnvironment from '@/libs/checkEnvironment'

interface Props {
  nested?: boolean
  accessToken: string | null
  loggedIn: boolean
  boardId: string
  commentId?: number
  refresh: () => Promise<void>
}

export default function CommentInput({ nested = false, accessToken, loggedIn, boardId, commentId = 0, refresh }: Props) {
  const [textareaValue, setTextareaValue] = useState<string>('')
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(checkEnvironment().concat('/api/board/forum/comment'), {
        method: 'POST',
        body: JSON.stringify({ board_id: boardId, reply: textareaValue, comment_id: commentId }),
        headers: {
          Authorization: `${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      })
      if (res.status === 200) {
        await refresh()
      } else if (res.status === 401) {
        alert('권한이 없어요')
      } else {
        alert('댓글 작성에 실패했어요')
      }
    } catch (error) {
      alert('댓글 작성에 실패했어요')
      return
    } finally {
      setTextareaValue('')
    }
  }

  return (
    <>
      <div className="px-[13px]">
        {loggedIn ? (
          <form onSubmit={handleSubmit}>
            <UserComment nested={nested} value={textareaValue} setValue={setTextareaValue} onSubmit={handleSubmit} loggedIn={true} />
          </form>
        ) : (
          <UserComment nested={nested} value={textareaValue} setValue={setTextareaValue} loggedIn={false} getLogIn={() => router.push('/auth')} />
        )}
      </div>
    </>
  )
}
