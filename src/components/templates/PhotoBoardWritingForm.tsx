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

export default function PhotoBoardWritingForm() {
  const router = useRouter()
  const handleWritingForm: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.back()
  }
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState('')
  const [onChange, setOnChange] = useState('')
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    console.log(e.target.value)
  }
  const titleRef = useRef<HTMLInputElement>(null) // useRef에 대한 타입 지정
  const editorRef = useRef<ReactQuill>(null)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const title = titleRef.current?.value ?? ''
    const content = editorRef.current?.getEditor().getContents() ?? ''

    // try {
    //   const response = await axios.post('/api/posts', { title, content })
    //   console.log(response.data) // 성공적으로 저장된 데이터 확인
    //   // 여기서 필요한 추가 작업을 수행하세요 (예: 리다이렉션)
    // } catch (error) {
    //   console.error(error)
    // }
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-[1010] bg-white w-screen h-screen overflow-auto">
        <div className="flex-col items-center justify-center">
          <div className="w-[100vw] h-[3.5rem] custom-border-b-1">
            <div className="flex justify-between items-center">
              <div className="h-[3.5rem] w-[3.5rem] flex justify-center items-center">
                <button onClick={handleWritingForm}>X</button>
              </div>
              <div>사진게시판</div>
              <div className="h-[3.5rem] w-[3.5rem]"></div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
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
                <button
                  className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-gray-1"
                  onClick={() => setOnChange('')}
                  type="submit"
                >
                  <h1 className="text-viva-gray-4">취소</h1>
                </button>
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-viva-6"
                  type="submit"
                >
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
