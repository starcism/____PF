'use client'

import formatDate from '@/libs/getFormDate'
import UserIcon from '../atoms/UserIcon'
import { useState } from 'react'
import checkEnvironment from '@/libs/checkEnvironment'
import { ConfirmModal } from '../atoms/ModalContainer'

interface Props {
  comment: {
    created_at: string
    reply: string
    nickname?: string
    user_id?: number
    icon?: string
    is_author?: boolean
    comment_id: string
    deleted_at?: null | string
  }
  boardId: string
  accessToken: string | null
  handleReplyIndex: (index: number) => void
  refresh: () => Promise<void>
}

export default function Comment({ boardId, accessToken, comment, handleReplyIndex, refresh }: Props) {
  const [createdDate, _] = useState<string>(formatDate(comment.created_at))
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const commentId = comment.comment_id
  const commenIndex = parseInt(commentId.slice(0, 3), 10)
  const isOriginComment = parseInt(commentId.slice(4, 7), 10) === 0

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const [confirm, setConfirm] = useState(false)
  const deleteComment = async () => {
    try {
      const res = await fetch(checkEnvironment().concat('/api/board/forum/comment'), {
        method: 'PUT',
        body: JSON.stringify({ board_id: boardId, comment_id: commentId }),
        headers: {
          Authorization: `${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      })

      if (res.status === 200) {
        // alert('댓글을 삭제했어요')
        await refresh()
      } else if (res.status === 401) {
        alert('권한이 없어요')
      } else {
        alert('삭제에 실패했어요')
      }
    } catch (error) {
      alert('삭제에 실패했어요')
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    return
  }

  if (comment.deleted_at && isOriginComment) {
    return (
      <>
        <div className={`flex w-full min-h-[50px pt-[17px] pb-[17px] items-center`}>
          <span className="text-gray-3 text-[14px]">삭제된 댓글이에요</span>
        </div>
      </>
    )
  } else if (comment.deleted_at && !isOriginComment) {
    return <></>
  }
  return (
    <>
      <div
        onClick={() => isOriginComment && handleReplyIndex(commenIndex)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex w-full min-h-[50px] pt-[15px] pb-[11px] justify-between ${!isOriginComment && 'pl-[50px]'}`}
      >
        <div className="flex max-w-[calc(100vw-76px)] h-full">
          <div className="pt-[7px]">
            <UserIcon />
          </div>
          <div>
            <div className="flex items-center">
              <div className="ml-[12px] flex items-center pb-[4px]">
                <span className="text-[14px] font-500 text-gray-4">{comment.nickname}</span>
                <span className="text-[11px] px-[6px] text-gray-3">&bull;</span>
                <span className="text-[13px] mr-[12px] text-gray-3 font-400">{createdDate}</span>
                {comment.is_author && (
                  <ConfirmModal confirmType="comment" onClick={deleteComment}>
                    <button
                      className="flex items-center justify-center transition-colors duration-200 rounded-[20px] w-[42px] h-[28px] text-darkgold hover:bg-darkgold hover:text-white"
                    >
                      <span className="text-[13px] font-400 select-none">삭제</span>
                    </button>
                  </ConfirmModal>
                )}
                {/* {comment.comment_id && <span className="text-[13px] pl-[20px] text-turquoise font-400">{comment.comment_id}</span>} */}
              </div>
            </div>
            <div className="flex mb-[6px] ml-[12px]">
              <h1 className="weight-400 leading-[22px] text-[14px] whitespace-pre-line">{`${comment.reply}`}</h1>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-center w-[50px] h-[50px]">
          <button
            onClick={(e) => handleClick(e)}
            className="flex items-center justify-center w-[40px] h-[40px] transition-colors duration-200 rounded-full hover:bg-gray-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-5 h-5 ${isHovered ? 'block' : 'hidden'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
