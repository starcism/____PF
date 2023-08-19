'use client'

import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ReactQuill from 'react-quill'
import { useRouter } from 'next/navigation'
import checkEnvironment from '@/libs/checkEnvironment'
import { useAccessTokenState } from '@/libs/AccessTokenProvider'

const QuillEditor = dynamic(() => import('@/libs/QuillEditor'), {
  ssr: false,
  loading: () => (
    <>
      <div className="h-[292px] w-[100vw] max-w-[800px]">
        <div className="flex items-center h-[42px] w-[100vw] py-[12px] px-[9px] max-w-[800px] bg-white custom-border-b-1 custom-border-t-1">
          <div className="bg-gray-1 w-[98px] h-[19px] ml-[4px] rounded-[5px]"></div>
          <div className="bg-gray-2 w-[108px] h-[19px] ml-[24px] rounded-[5px]"></div>
          {/* <div className="bg-gray-2 w-[22px] h-[19px] ml-[24px] rounded-[5px]"></div> */}
        </div>
        <div className="h-[250px] w-[100vw] max-w-[800px] py-[12px] px-[9px] custom-border-b-0">
          <div className="bg-gray-1 w-[120px] h-[19px] ml-[4px] rounded-[5px]"></div>
        </div>
      </div>
    </>
  ),
})

type TonSubmit = {
  onSubmit: (title: string, content: string) => void
}

export default function FreeBoardWritingForm({}) {
  const router = useRouter()
  const { accessToken } = useAccessTokenState()

  const [value, setValue] = useState('')
  const [close, setClose] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<ReactQuill>(null)

  const handleFormClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    setClose(true)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const editor = editorRef.current?.getEditor()
    const title = titleRef.current?.value.trim() ?? ''
    const content = editor?.root.innerHTML.trim()
    if (close) {
      if (title || content) {
        const confirmed = window.confirm('작성중인 내용은 저장되지 않습니다. 계속할까요?')
        if (confirmed) {
          router.replace('/forum')
          setClose(false)
          return
        } else {
          setClose(false)
          return
        }
      } else {
        router.replace('/forum')
        setClose(false)
        return
      }
    }
    if (!title) {
      alert('제목을 입력해주세요')
      return
    }

    if (!content) {
      alert('내용을 입력해주세요')
      return
    }

    if (title.length > 40) {
      alert('제목은 최대 40글자까지 입력할 수 있어요')
      return
    }

    if (content.length > 2000) {
      alert('내용은 최대 2000글자까지 입력할 수 있어요')
      return
    }

    // const formData = new FormData()
    // formData.append('title', title)
    // formData.append('content', content)

    try {
      const res = await fetch(checkEnvironment().concat('/api/board/forum'), {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          Authorization: `${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      })
      console.log('res:', res)
      if (res.status === 401) {
        alert('권한이 만료되었어요')
        router.replace('/forum')
        return
      } else if (res.status === 400) {
        alert('제출 형식이 잘못되었어요')
        return
      } else if (res.ok) {
        // const revalidate = await fetch(checkEnvironment().concat('/api/revalidate'), {
        //   method: 'GET',
        // })
        alert('글 작성을 완료했어요')
        router.refresh()
        router.replace('/forum')
        return
      } else {
        alert('글 작성에 실패했어요')
        return
      }
    } catch (error) {
      alert('글 작성 실패2')
      return
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed left-0 top-0 z-[1010] bg-white w-screen h-[54px]">
          <div className="flex-col justify-center">
            <div className="w-[100vw] h-[53px] custom-border-b-1 bg-white">
              <div className="flex justify-between items-center">
                <div className="h-[53px] w-[53px] flex justify-center items-center">
                  <button className="justify-center items-center" onClick={handleFormClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                </div>
                <div className="grid place-items-center gap-1">
                  <h1 className="text-[16px] select-none">글쓰기</h1>
                  <h1 className="text-[13px] text-gray-3 select-none">포럼</h1>
                </div>
                <div className="h-[53px] w-[53px] flex justify-center items-center select-none">
                  <button onClick={handleSubmit}>
                    <span>등록</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen mt-[54px] bg-white">
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
        </div>
      </form>
    </>
  )
}
