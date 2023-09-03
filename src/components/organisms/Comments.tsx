'use client'

import { Comments } from '@/types/types'
import Comment from '../molecules/Comment'
import { useState } from 'react'
import CommentInput from './CommentInput'

interface Props {
  commentList: Comments[]
  accessToken: string | null
  loggedIn: boolean
  boardId: string
  refresh: () => Promise<void>
}

export default function Comments({ commentList, accessToken, loggedIn, boardId, refresh }: Props) {
  const [nestedReply, setNestedReply] = useState<number | null>(null)
  const commentLength = commentList.filter(comment => comment.deleted_at === null).length
  const isOriginComment = (commentId: string) => {
    return parseInt(commentId.slice(4, 7), 10) === 0
  }
  const commentIndex = (commentId: string) => {
    return parseInt(commentId.slice(0, 3), 10)
  }
  const handleReplyIndex = (index: number) => {
    if (nestedReply === index) {
      setNestedReply(null)
    } else {
      setNestedReply(index)
    }
  }

  return (
    <>
      <div className="px-[13px]">
        <div className="flex items-center w-full h-[30px] mt-[11px] mb-[0px]">
          <h1 className="flex items-center text-[16px] text-gray-6">{`댓글 ${commentLength ? commentLength : '0'}개`}</h1>
        </div>
        {commentList.length > 0 &&
          commentList.map((comment, index) => (
            <div key={index}>
              <Comment accessToken={accessToken} boardId={boardId} comment={comment} handleReplyIndex={handleReplyIndex} refresh={refresh} />
              {isOriginComment(comment.comment_id) && commentIndex(comment.comment_id) === nestedReply ? (
                <CommentInput commentId={nestedReply} nested={true} boardId={boardId} accessToken={accessToken} loggedIn={loggedIn} refresh={refresh} />
              ) : (
                <></>
              )}
            </div>
          ))}
      </div>
    </>
  )
}
