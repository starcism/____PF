'use client'

import 'react-quill/dist/quill.bubble.css'
import formatDate from '@/libs/getFormDate'
import UserIcon from '../atoms/UserIcon'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import UserComment from '../molecules/UserComment'
import { useAccessTokenState } from '@/libs/AccessTokenProvider'
import { QuillContext } from '@/libs/QuillProvider'
import checkEnvironment from '@/libs/checkEnvironment'
import LoadingSpinner from '../atoms/LoadingSpinner'

interface Props {
  profileImage?: string
  nickname: string

  title: string
  content: string

  view: number
  createdAt: string
  updatedAt?: string
}

// const QuillReader = dynamic(() => import('@/libs/QuillReader'), {
//   ssr: false,
// })

export default function FreeBoard({ nickname, title, content, view, createdAt, updatedAt }: Props) {
  const { accessToken } = useAccessTokenState()
  const { reader, setValue } = useContext(QuillContext)
  const createdDate = createdAt && formatDate(createdAt)

  const textRef = useRef<HTMLTextAreaElement>(null)
  useLayoutEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto'
      const newHeight = textRef.current.scrollHeight + 'px'
      textRef.current.style.height = newHeight
    }
  }, [])

  useEffect(() => {
    setValue(content)
  }, [])

  return (
    <>
      <div className="w-full px-[13px] pt-[17px]">
        <div className="flex w-full h-[50px] pb-[10px] items-center justify-between">
          <div className="flex items-center">
            <UserIcon />
            <div>
              <div className="flex mb-[6px] ml-[12px] mr-[12px] overflow-hidden max-h-[40px]">
                <h1 className="font-700 leading-[22px] text-[16px]">{`${title}`}</h1>
              </div>
              <div className="flex items-center">
                <div className="ml-[12px] flex items-center">
                  <span className="text-[14px] font-600 text-gray-4">{nickname}</span>
                  <span className="text-[11px] px-[6px] text-gray-3">&bull;</span>
                  <span className="text-[14px] text-gray-4 font-500">{createdDate}</span>
                </div>
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
        <div className="mt-[11px] min-h-[100px] h-full">
          {reader}
          {/* <textarea
            readOnly
            className="flex w-[100vw] leading-[26px] max-w-[800px] outline-none resize-none text-[16px] scrollbar-hide font-400 placeholder:text-gray-3"
            defaultValue={content}
            ref={textRef}
          /> */}
        </div>
      </div>
    </>
  )
}
