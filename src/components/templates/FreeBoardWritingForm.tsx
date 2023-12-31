'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ReactQuill from 'react-quill'
import { useRouter } from 'next/navigation'
import checkEnvironment from '@/libs/checkEnvironment'
import { useAccessTokenState } from '@/libs/AccessTokenProvider'
import LoadingSpinner from '../atoms/LoadingSpinner'

const QuillEditor = dynamic(() => import('@/libs/QuillEditor'), {
  ssr: false,
  loading: () => (
    <>
      <div className="min-h-[500px] max-h-[100vh] w-[100vw] max-w-[768px]">
        <div className="flex items-center h-[42px] w-[100vw] py-[12px] px-[9px] max-w-[768px] bg-white custom-border-b-1 custom-border-t-1">
          <div className="skeleton2 w-[98px] h-[19px] ml-[4px] rounded-[5px]"></div>
          <div className="skeleton1 w-[108px] h-[19px] ml-[24px] rounded-[5px]"></div>
          {/* <div className="bg-gray-2 w-[22px] h-[19px] ml-[24px] rounded-[5px]"></div> */}
        </div>
        <div className="min-h-[500px] max-h-[100vh] w-[100vw] max-w-[768px] py-[12px] px-[9px] custom-border-b-0">
          <div className="skeleton2 w-[120px] h-[19px] ml-[4px] rounded-[5px]"></div>
        </div>
      </div>
    </>
  ),
})

export default function FreeBoardWritingForm() {
  const router = useRouter()
  const { accessToken } = useAccessTokenState()

  const [value, setValue] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<ReactQuill>(null)

  const handleFormClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    const editor = editorRef.current?.getEditor()
    const title = titleRef.current?.value.trim() ?? ''
    const contentValue = editor?.getText()

    if (title || (contentValue && contentValue.length > 1)) {
      const confirmed = window.confirm('작성중인 내용은 저장되지 않습니다. 계속할까요?')
      if (confirmed) {
        router.replace('/forum')
        return
      } else {
        return
      }
    } else {
      router.replace('/forum')
      return
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmit) {
      return
    }
    setIsSubmit(true)

    const editor = editorRef.current?.getEditor()
    const title = titleRef.current?.value.trim() ?? ''
    const content = editor?.root.innerHTML.trim()
    const contentValue = editor?.getText()

    if (!title) {
      setIsSubmit(false)
      alert('제목을 입력해주세요')
      return
    }

    if (!contentValue || contentValue.length <= 1) {
      setIsSubmit(false)
      alert('내용을 입력해주세요')
      return
    }

    if (title.length > 40) {
      setIsSubmit(false)
      alert('제목은 최대 40글자까지 입력할 수 있어요')
      return
    }

    if (contentValue.length > 2000) {
      setIsSubmit(false)
      alert('내용은 최대 2000글자까지 입력할 수 있어요')
      return
    }

    // const formData = new FormData()
    // formData.append('title', title)
    // formData.append('content', content)

    try {
      const res = await fetch(checkEnvironment().concat('/api/board/forum'), {
        method: 'POST',
        body: JSON.stringify({ title, content, contentValue }),
        headers: {
          Authorization: `${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      })
      if (res.status === 401) {
        alert('권한이 만료되었어요')
        router.replace('/forum')
      } else if (res.status === 400) {
        alert('제출 형식이 잘못되었어요')
      } else if (res.ok) {
        router.replace('/forum')
      } else {
        alert('글 작성에 실패했어요')
      }
    } catch (error) {
      alert('글 작성에 실패했어요')
    } finally {
      setIsSubmit(false)
    }
  }

  if (isSubmit) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed top-0 z-[1010] w-full max-w-[766px] bg-white h-[54px]" style={{ margin: '0 auto' }}>
          <div className="flex-col justify-center">
            <div className="w-full h-[53px] custom-border-b-1 bg-white">
              <div className="flex justify-between items-center">
                <div className="h-[53px] w-[53px] flex justify-center items-center">
                  <button type="button" className="justify-center items-center" onClick={(e) => handleFormClose(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                </div>
                <div className="grid place-items-center gap-1">
                  <h1 className="text-[16px] select-none">글쓰기</h1>
                  <h1 className="text-[13px] text-gray-3 select-none">포럼</h1>
                </div>
                <div className="h-[53px] w-[80px] flex justify-center items-center select-none">
                  <button onClick={handleSubmit}>
                    <span>등록</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pt-[54px] bg-white max-w-[768px]">
          <div className="flex justify-center w-full h-[3rem] my-[0.2rem]">
            <input
              className="w-full max-w-[800px] h-[3rem] py-[12px] px-[15px] outline-none overflow-auto text-[17px] weight-700 placeholder:text-gray-3"
              placeholder="제목"
              maxLength={100}
              ref={titleRef}
              type="text"
              onKeyDown={handleKeyDown}
            ></input>
          </div>
          <div className="flex w-full max-w-[768px] justify-center">
            <QuillEditor quillRef={editorRef} value={value} onChange={setValue} placeholder="내용을 입력하세요." />
          </div>
        </div>
      </form>
    </>
  )
}
