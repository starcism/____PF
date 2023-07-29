'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const title = titleRef.current?.value ?? ''

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
          <div className="w-[100vw] h-[53px] custom-border-b-1 bg-white">
            <div className="flex justify-between items-center">
              <div className="h-[53px] w-[53px] flex justify-center items-center">
                <button className="justify-center items-center" onClick={handleWritingForm}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              </div>
              <div className="grid place-items-center gap-1">
                <h1 className="text-[16px] select-none">글쓰기</h1>
                <h1 className="text-[13px] text-gray-3 select-none">PHOTO</h1>
              </div>
              <div className="h-[53px] w-[53px] flex justify-center items-center select-none">등록</div>
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
              <>
                <div className="h-[470px] w-[100vw] max-w-[800px]">
                  <div className="flex items-center h-[100px] flex-nowrap overflow-x-scroll py-[12px] px-[9px] bg-white">
                  <div className="h-[80px] w-[60px] bg-green-400 ml-3"></div>
                  <div className="h-[80px] w-[60px] bg-green-400 ml-3"></div>
                  <div className="h-[80px] w-[60px] bg-green-400 ml-3"></div>

                    <div className="w-[48px] h-[48px] rounded-full border-solid border border-lightgold justify-center items-center flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-4">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-[430px] w-[100vw] max-w-[800px] py-[12px] px-[9px] custom-border-b-0">
                    <div className="bg-gray-1 w-[112px] h-[19px] ml-[4px] rounded-[5px]"></div>
                    <div className="flex">
                      <div className="flex items-center justify-center bg-white w-[60px] h-[24px] ml-[4px] rounded-[10px] border border-solid border-gray-2">
                        <span className="text-[14px] text-gray-4">#태그</span>
                      </div>
                      <div className="flex items-center justify-center bg-white w-[60px] h-[24px] ml-[12px] rounded-[10px] border border-solid border-gray-2">
                        <span className="text-[14px] text-gray-4">#태그</span>
                      </div>
                      <div className="flex items-center justify-center bg-white w-[60px] h-[24px] ml-[12px] rounded-[10px] border border-solid border-gray-2">
                        <span className="text-[14px] text-gray-4">#태그</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
            {/* <div className="flex justify-center h-[3rem] px-[11px] pt-[18px] pb-[14px] mb-[200px]">
              <div className="flex w-[100vw] max-w-[800px]">
                <button className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-gray-1" onClick={() => setOnChange('')} type="submit">
                  <h1 className="text-gray-3">취소</h1>
                </button>
                <button onClick={(e) => handleSubmit(e)} className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-gray-2" type="submit">
                  <h1 className="text-black">등록</h1>
                </button>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </>
  )
}
