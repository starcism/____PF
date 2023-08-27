'use client'

import formatDate from '@/libs/getFormDate'
import UserIcon from '../atoms/UserIcon'

interface Props {
  key: number | string
  comment: { created_at: string; reply: string; nickname?: string; user_id?: number; icon?: string; is_author?: boolean }
}

export default function Comment({ comment }: Props) {
  const createdDate = comment.created_at && formatDate(comment.created_at)
  return (
    <>
      <div className="flex w-full min-h-[50px] my-[13px] items-center justify-between">
        <div className="flex max-w-[calc(100vw-76px)] h-full">
          <UserIcon />
          <div>
            <div className="flex items-center">
              <div className="ml-[12px] flex items-center pb-[6px]">
                <span className="text-[14px] font-500 text-gray-4">{comment.nickname}</span>
                <span className="text-[11px] px-[6px] text-gray-3">&bull;</span>
                <span className="text-[13px] text-gray-3 font-400">{createdDate}</span>
                {comment.is_author && <span className="text-[13px] pl-[11px] text-gray-4 font-400">수정</span>}
                {comment.is_author && <span className="text-[13px] pl-[8px] text-gray-4 font-400">삭제</span>}
              </div>
            </div>
            <div className="flex mb-[6px] ml-[12px]">
              <h1 className="weight-400 leading-[18px] text-[14px]">{`${comment.reply}`}</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-[50px] h-[50px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>
    </>
  )
}
