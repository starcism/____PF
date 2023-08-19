'use client'

import 'react-quill/dist/quill.bubble.css'
import formatDate from '@/libs/getFormDate'
import UserIcon from '../atoms/UserIcon'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import UserComment from '../molecules/UserComment'
import { useAccessTokenState } from '@/libs/AccessTokenProvider'
import { QuillContext } from '@/libs/QuillProvider'
import checkEnvironment from '@/libs/checkEnvironment'

interface Props {
  profileImage?: string
  boardId: string
  nickname: string

  title: string
  content: string
  commentCount: number
  liked: number

  view: number
  createdAt: string
  updatedAt?: string
}

// const QuillReader = dynamic(() => import('@/libs/QuillReader'), {
//   ssr: false,
// })

export default function FreeBoard({ boardId, nickname, title, content, commentCount, liked, view, createdAt, updatedAt }: Props) {
  const { accessToken } = useAccessTokenState()
  const { reader, setValue } = useContext(QuillContext)
  const createdDate = createdAt && formatDate(createdAt)
  const [like, setLike] = useState(false)
  const [commentList, setCommentList] = useState([])

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLike(!like)
  }

  const [textareaValue, setTextareaValue] = useState<string>('')

  const textRef = useRef<HTMLTextAreaElement>(null)
  useLayoutEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = 'auto'
      const newHeight = textRef.current.scrollHeight + 'px'
      textRef.current.style.height = newHeight
    }

    setValue(content)
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch(checkEnvironment().concat(`/api/board/forum/info?boardId=${boardId}`), {
        method: 'POST',
        cache: 'no-store',
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      if (res.status === 200) {
        const { userLike, comments } = await res.json()
        setLike(userLike)
        setCommentList(comments)
      } else {
        return
      }
    } catch (error) {
      console.log(error)
      return
    }
  }

  useEffect(() => {
    fetchData()
  }, [accessToken])

  return (
    <>
      <div className="w-full px-[13px] pt-[17px]">
        <div className="flex w-full h-[50px] pb-[10px] items-center justify-between">
          <div className="flex items-center">
            <UserIcon />
            <div>
              <div className="flex mt-[4px] mb-[6px] ml-[12px] mr-[12px] overflow-hidden max-h-[40px]">
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
        <div className="mt-[11px] h-full">
          {reader}
          {/* <textarea
            readOnly
            className="flex w-[100vw] leading-[26px] max-w-[800px] outline-none resize-none text-[16px] scrollbar-hide font-400 placeholder:text-gray-3"
            defaultValue={content}
            ref={textRef}
          /> */}
        </div>
        <div className="flex items-center h-[40px]">
          <div className="flex items-center">
            <button className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] ml-[6px] text-pinkish" onClick={handleLikeClick}>
              <svg
                className={`inline-block align-middle w-[24px] h-[24px] ${
                  like ? 'fill-pinkish' : 'fill-none hover:text-lightpinkish'
                } transition-transform transform-gpu active:scale-125`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                strokeWidth={1.3}
                stroke="currentColor"
              >
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>
            </button>
            <span className="text-[14px] weight-350 select-none text-pinkish">{liked}</span>
          </div>
          <div className="mr-[6px] flex items-center">
            <div className="flex items-center justify-center select-none ml-[6px] rounded-[50%] w-[32px] h-[32px] text-turquoise">
              <svg
                className="inline-block align-middle mb-[1px] w-[24px] h-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
            </div>
            <span className="text-[14px] weight-350 select-none text-turquoise">{commentCount}</span>
          </div>
        </div>
        <form>
          <UserComment value={textareaValue} setValue={setTextareaValue} />
        </form>
      </div>
    </>
  )
}
