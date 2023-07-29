'use client'

import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ReactQuill from 'react-quill'
import { useRouter } from 'next/navigation'

const QuillEditor = dynamic(() => import('@/libs/QuillEditor'), {
  ssr: false,
  loading: () => (
    <>
      <div className="h-[470px] w-[100vw] max-w-[800px]">
        <div className="flex items-center h-[40px] w-[100vw] py-[12px] px-[9px] max-w-[800px] bg-viva-8">
          <div className="bg-viva-6 w-[98px] h-[19px] ml-[4px] rounded-[5px]"></div>
          <div className="bg-viva-7 w-[108px] h-[19px] ml-[24px] rounded-[5px]"></div>
          <div className="bg-viva-6 w-[22px] h-[19px] ml-[24px] rounded-[5px]"></div>
        </div>
        <div className="h-[430px] w-[100vw] max-w-[800px] py-[12px] px-[9px] custom-border-b-0">
          <div className="bg-gray-1 w-[112px] h-[19px] ml-[4px] rounded-[5px]"></div>
        </div>
      </div>
    </>
  ),
})

type TonSubmit = {
  onSubmit: (title: string, content: string) => void
}

export default function FreeBoardWritingForm({ onSubmit }: TonSubmit) {
  const router = useRouter()

  const [value, setValue] = useState('')
  const [close, setClose] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<ReactQuill>(null)
  const title = titleRef.current?.value.trim() ?? ''
  const content = editorRef.current?.getEditor().getText().trim() ?? ''
  const handleFormClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    setClose(true)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (close) {
      if (title || content) {
        const confirmed = window.confirm('작성중인 내용은 저장되지 않습니다. 계속할까요?')
        if (confirmed) {
          router.back()
          setClose(false)
          return
        }
        else {
          setClose(false)
          return
        }
      } else {
        router.back()
        setClose(false)
        return
      }
    }
    if (!title) {
      alert('제목을 입력해주세요.')
      return
    }

    if (!content) {
      alert('내용을 입력해주세요.')
      return
    }

    if (title.length > 40) {
      alert('제목은 최대 40글자까지 입력할 수 있습니다.')
      return
    }

    if (content.length > 2000) {
      alert('내용은 최대 2000글자까지 입력할 수 있습니다.')
      return
    }

    // 폼 데이터를 onSubmit 콜백 함수로 전달
    onSubmit(title, content)
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-[1010] bg-white w-screen h-screen overflow-auto">
        <div className="flex-col items-center justify-center">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between w-[100vw] h-[3.5rem] custom-border-b-1">
              <div className="flex items-center justify-center w-[3.5rem] h-[3.5rem]">
                <button className="p-[4px]" onClick={handleFormClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-center h-[3.5rem]">
                <div className="text-[17px] mt-1 select-none">자유게시판</div>
              </div>
              <div className="flex items-center justify-center w-[3.5rem] h-[3.5rem]"></div>
            </div>
            <div className="flex justify-center w-[100vw] h-[3rem] my-[0.2rem]">
              <input
                className="w-[100vw] max-w-[800px] h-[3rem] py-[12px] px-[15px] outline-none overflow-auto text-[17px] weight-700 placeholder:text-gray-3"
                placeholder="제목"
                maxLength={100}
                ref={titleRef}
                type="text"
              ></input>
            </div>
            <div className="flex w-[100vw] justify-center">
              <QuillEditor quillRef={editorRef} value={value} onChange={setValue} placeholder="내용을 입력하세요." />
            </div>
            <div className="flex justify-center h-[3rem] px-[11px] pt-[18px] pb-[14px] mb-[200px]">
              <div className="flex w-[100vw] max-w-[800px]">
                <button className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-gray-1" onClick={handleFormClose} type="submit">
                  <h1 className="text-viva-gray-4">취소</h1>
                </button>
                <button onClick={(e) => handleSubmit(e)} className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-viva-6" type="submit">
                  <h1 className="text-viva-gray-4">등록</h1>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
