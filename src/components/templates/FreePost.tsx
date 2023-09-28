'use client'

import 'react-quill/dist/quill.bubble.css'
import formatDate from '@/libs/getFormDate'
import UserIcon from '../atoms/UserIcon'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { QuillContext } from '@/libs/QuillProvider'
import checkEnvironment from '@/libs/checkEnvironment'
import ModalContainer, { ConfirmModal } from '../atoms/ModalContainer'
import { useRouter } from 'next/navigation'

interface Props {
  icon: string
  nickname: string
  UID: number | null
  userId: number
  accessToken: string | null
  boardId: number

  title: string
  content: string

  view: number
  createdAt: string
  updatedAt?: string
}

export default function FreePost({ nickname, icon, title, content, view, createdAt, updatedAt, UID, userId, accessToken, boardId }: Props) {
  const { reader, setValue } = useContext(QuillContext)
  const createdDate = createdAt && formatDate(createdAt)
  const router = useRouter()
  const [author, setAuthor] = useState(false)

  useEffect(() => {
    if (UID === userId) {
      setAuthor(true)
    }
  }, [UID])

  const deletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    try {
      const res = await fetch(checkEnvironment().concat('/api/board/forum'), {
        method: 'PUT',
        body: JSON.stringify({ boardId }),
        headers: {
          Authorization: `${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      })

      if (res.status === 200) {
        // alert('게시글을 삭제했어요')
        router.back()
      } else if (res.status === 401) {
        alert('권한이 없어요')
      } else {
        alert('삭제에 실패했어요')
      }
    } catch (error) {
      alert('삭제에 실패했어요')
    }
  }

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
            <UserIcon profile_image={icon} />
            <div>
              <div className="flex mb-[6px] ml-[12px] mr-[12px] overflow-hidden max-h-[40px]">
                <h1 className="font-700 leading-[22px] text-[16px]">{`${title}`}</h1>
              </div>
              <div className="flex items-center">
                <div className="ml-[12px] flex items-center">
                  <span className="text-[14px] font-500 text-gray-4">{nickname}</span>
                  <span className="text-[11px] px-[6px] text-gray-3">&bull;</span>
                  <span className="text-[14px] text-gray-3 font-400">{createdDate}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-[50px] h-[50px]">
            {author && (
              <ConfirmModal onClick={deletePost} isAuthor={author}>
                <button className="flex items-center justify-center w-[40px] h-[40px] transition-colors duration-200 rounded-full hover:bg-gray-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5`}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </button>
              </ConfirmModal>
            )}
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
