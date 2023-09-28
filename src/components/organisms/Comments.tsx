'use client'

import { Comments } from '@/types/types'
import Comment from '../molecules/Comment'
import { useState } from 'react'
import CommentInput from './CommentInput'

interface Props {
  commentList: Comments[]
  profile_image: string
  accessToken: string | null
  loggedIn: boolean
  boardId: string
  refresh: () => Promise<void>
}

export default function Comments({ commentList, profile_image, accessToken, loggedIn, boardId, refresh }: Props) {
  const [nestedReply, setNestedReply] = useState<number | null>(null)
  const commentLength = commentList.filter((comment) => comment.deleted_at === null).length
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
  const refreshComments = async () => {
    await refresh()
  }

  return (
    <>
      <div className="px-[13px]">
        <div className="flex items-center w-full h-[30px] mt-[11px] mb-[0px]">
          <h1 className="flex items-center text-[16px] text-gray-6 font-500">{`댓글 ${commentLength ? commentLength : '0'}개`}</h1>
          <button onClick={refreshComments} className="ml-[6px] pt-[2px] flex items-center text-gray-3 h-[30px] w-[30px]">
            <svg fill="#bbbbbb" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#bbbbbb">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M27.1 14.313V5.396L24.158 8.34c-2.33-2.325-5.033-3.503-8.11-3.503C9.902 4.837 4.901 9.847 4.899 16c.001 6.152 5.003 11.158 11.15 11.16 4.276 0 9.369-2.227 10.836-8.478l.028-.122h-3.23l-.022.068c-1.078 3.242-4.138 5.421-7.613 5.421a8 8 0 0 1-5.691-2.359A7.993 7.993 0 0 1 8 16.001c0-4.438 3.611-8.049 8.05-8.049 2.069 0 3.638.58 5.924 2.573l-3.792 3.789H27.1z"></path>
              </g>
            </svg>
          </button>
        </div>
        {commentList.length > 0 &&
          commentList.map((comment, index) => (
            <div key={index}>
              <Comment accessToken={accessToken} boardId={boardId} comment={comment} handleReplyIndex={handleReplyIndex} refresh={refresh} />
              {isOriginComment(comment.comment_id) && commentIndex(comment.comment_id) === nestedReply ? (
                <CommentInput commentId={nestedReply} nested={true} profile_image={profile_image} boardId={boardId} accessToken={accessToken} loggedIn={loggedIn} refresh={refresh} />
              ) : (
                <></>
              )}
            </div>
          ))}
      </div>
    </>
  )
}
