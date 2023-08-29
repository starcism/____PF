'use client'

import formatDate from '@/libs/getFormDate'
import UserIcon from '../atoms/UserIcon'
import { useState } from 'react'

interface Props {
  key: number | string
  comment: { created_at: string; reply: string; nickname?: string; user_id?: number; icon?: string; is_author?: boolean; comment_id: string }
  handleReplyIndex: (index: number) => void
}

export default function Comment({ comment, handleReplyIndex }: Props) {
  const createdDate = comment.created_at && formatDate(comment.created_at)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const commentId = comment.comment_id
  const a = parseInt(commentId.slice(0, 3), 10)
  const b = parseInt(commentId.slice(4, 7), 10)

  // console.log('a:', a, 'b:', b)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <>
      <div
        onClick={() => handleReplyIndex(a)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex w-full min-h-[50px] pt-[3px] pb-[21px] items-center justify-between"
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
                  <button className="flex items-center justify-center transition-colors duration-200 rounded-[20px] w-[42px] h-[28px] text-darkgold hover:bg-darkgold hover:text-white">
                    <span className="text-[13px] font-400">삭제</span>
                  </button>
                )}
                {comment.comment_id && <span className="text-[13px] pl-[100px] text-turquoise font-400">{comment.comment_id}</span>}
              </div>
            </div>
            <div className="flex mb-[6px] ml-[12px]">
              <h1 className="weight-400 leading-[18px] text-[14px]">{`${comment.reply}`}</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-[50px] h-[50px]">
          <button className="flex items-center justify-center w-[40px] h-[40px] transition-colors duration-200 rounded-full hover:bg-gray-1">
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
