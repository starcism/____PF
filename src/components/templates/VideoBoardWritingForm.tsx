'use client'

import React, { useEffect, useRef, useState } from 'react'
import '@/styles/checkbox.css'
import { useRouter } from 'next/navigation'
import checkEnvironment from '@/libs/checkEnvironment'
import Image from 'next/image'
import { CircleImageButton, OptionalButton } from '../atoms/Button'
import Tag from '../atoms/Tag'
import { useAccessTokenState } from '@/libs/AccessTokenProvider'
import YoutubeThumbnail from '../atoms/YoutubeThumbnail'
import ModalContainer, { ModalSetVideo } from '../atoms/ModalContainer'

export default function PhotoBoardWritingForm() {
  const router = useRouter()
  const { accessToken } = useAccessTokenState()
  const titleRef = useRef<HTMLInputElement>(null)

  const handleWritingForm: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.replace('/video')
  }

  const [selectedIndex, setSelectedIndex] = useState([0, 0, 0, 0, 0, 0])
  const [selectAll, setSelectAll] = useState(false)
  const nameTags = ['유진', '가을', '레이', '원영', '리즈', '이서']
  const postTags = ['공튜브', '자컨', '콘서트', '팬싸', '팬튜브', '기타']
  const [postTagIndex, setPostTagIndex] = useState<number | null>(null)

  const tagButtonUrl = ['/images/yujin.jpeg', '/images/gaeul.jpeg', '/images/rei.jpeg', '/images/wonyo.jpeg', '/images/liz.jpeg', '/images/leeseo.jpeg']
  const setTagByIndex = (index: number) => {
    if (selectAll) {
      setSelectAll(false)
    }
    const updatedSelectedIndex = [...selectedIndex]
    updatedSelectedIndex[index] = updatedSelectedIndex[index] ? 0 : 1
    const isAllSelected = updatedSelectedIndex.every((element) => element === 1)
    setSelectedIndex(updatedSelectedIndex)

    if (isAllSelected) {
      return setSelectAll(true)
    }
  }
  const handleSelectAll = (e: boolean) => {
    if (e === false) {
      setSelectedIndex([1, 1, 1, 1, 1, 1])
    } else {
      setSelectedIndex([0, 0, 0, 0, 0, 0])
    }
    setSelectAll(!e)
  }

  const [youtubeUrl, setYoutubeUrl] = useState<string>('')

  const getYoutubeUrl = (url: string) => {
    setYoutubeUrl(url)
  }

  //텍스트 영역 핸들링
  const [value, setValue] = useState<string>('')

  const PreventKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //텍스트 영역 포커스 이동 방지
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault()
    }
  }

  //폼 제출
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    const title = titleRef.current?.value.trim() ?? ''
    if (isSubmit) {
      return
    }

    setIsSubmit(true)

    if (!title) {
      alert('코멘트를 입력해주세요')
      setIsSubmit(false)
      return
    }

    if (!youtubeUrl || youtubeUrl.length === 0) {
      alert('유튜브 주소를 업로드해주세요')
      setIsSubmit(false)
      return
    }

    const tagUnSelected = selectedIndex.every((element) => element === 0)

    if (postTagIndex === null || tagUnSelected) {
      alert('태그를 선택해주세요')
      setIsSubmit(false)
      return
    }

    const tag = selectedIndex.join('')
    const postTag = postTagIndex !== null && postTags[postTagIndex]

    try {
      const res = await fetch(checkEnvironment().concat('/api/board/video'), {
        method: 'POST',
        body: JSON.stringify({ tag, postTag, title, youtubeUrl }),
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      if (res.status === 200) {
        const data = await res.json()
        console.log(data)

        router.push('/video')
      } else if (res.status === 401) {
        alert('권한이 만료되었어요')
        return
      } else if (res.status === 400) {
        alert('제출 형식이 잘못되었어요')
        return
      } else {
        const response1 = await res.json()
        console.log(response1)
        alert('글 작성에 실패했어요1')
        return
      }
    } catch (error) {
      alert('글 작성에 실패했어요2')
      console.error(error)
    } finally {
      setIsSubmit(false)
    }
  }

  return (
    <>
      <form onSubmit={submitPost}>
        <div className="fixed left-0 top-0 z-[1010] bg-white w-full max-w-[768px] h-[54px]">
          <div className="flex-col justify-center">
            <div className="w-[100vw] h-[53px] custom-border-b-1 bg-white">
              <div className="flex justify-between items-center">
                <div className="h-[53px] w-[53px] flex justify-center items-center">
                  <button type="button" className="justify-center items-center" onClick={handleWritingForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                </div>
                <div className="grid place-items-center gap-1">
                  <h1 className="text-[16px] select-none">글쓰기</h1>
                  <h1 className="text-[13px] text-gray-3 select-none">영상</h1>
                </div>
                <div className="h-[53px] w-[53px] flex justify-center items-center select-none">
                  <button type="submit">
                    <span>등록</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-[54px] bg-white">
          <div className="flex w-[100vw] justify-center">
            <>
              <div className="flex-col w-[100vw] max-w-[800px]">
                {youtubeUrl ? (
                  <YoutubeThumbnail url={youtubeUrl} deleteButton={getYoutubeUrl} />
                ) : (
                  <div className={`flex justify-center items-center py-[20px]`}>
                    <ModalSetVideo setUrl={getYoutubeUrl}>
                      <button
                        type="button"
                        className="h-[186px] w-[330px] mx-[10px] items-center justify-center rounded-[10px] border border-semigold bg-gray-1 border-dashed"
                      >
                        <div className="flex justify-center">
                          <svg className="text-semigold" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 48 48">
                            <path
                              fill="currentColor"
                              d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                            ></path>
                            <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                          </svg>
                        </div>
                        <span className="text-darkgold">영상 공유하기</span>
                      </button>
                    </ModalSetVideo>
                  </div>
                )}
                <div className="flex overflow-hidden max-w-[800px] justify-center w-[100vw] my-[0.2rem]">
                  <input
                    className="flex w-[100vw] h-[50px] leading-[26px] max-w-[800px] px-[15px] outline-none resize-none text-[16px] scrollbar-hide font-350 placeholder:text-gray-3"
                    placeholder="제목 입력"
                    maxLength={50}
                    onKeyDown={PreventKeyDown}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    ref={titleRef}
                  />
                </div>
                <div className="w-[100vw] max-w-[800px] h-[68px] grid place-content-center-center custom-border-b-0 overflow-x-auto scrollbar-hide flex-nowrap">
                  <div className="w-[calc(100vw-26px)] max-w-[800px] min-h-[68px] place-content-center mx-[13px] grid-tags custom-border-b-0">
                    {nameTags.map(
                      (tag, index) =>
                        selectedIndex[index] === 1 && (
                          <div key={index}>
                            <Tag text={nameTags[index]} />
                          </div>
                        ),
                    )}
                    {postTagIndex !== null && <Tag text={postTags[postTagIndex]} />}
                  </div>
                  {/* <div className="flex min-h-[32px] ml-[13px] items-center space-x-2">
                    {nameTags.map(
                      (tag, index) =>
                        selectedIndex[index] === 1 && (
                          <div key={index}>
                            <Tag text={nameTags[index]} />
                          </div>
                        ),
                    )}
                  </div> */}
                </div>
              </div>
            </>
          </div>
          <div className="flex-col justify-center items-center w-[100vw] h-[70vh]">
            <div className="ml-[17px] mt-[3px] w-[calc(100vw-17px)] h-[33px] flex items-center">
              <span className="text-[13px] font-700 select-none">태그설정</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="ml-1 mb-[2px] w-4 h-4 text-white bg-gray-3 rounded-full"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div className="flex py-[10px] pl-[13px] pr-[36px] items-center w-[calc(100vw)] overflow-x-auto flex-nowrap scrollbar-hide">
              {selectedIndex.map((_, i) => (
                <div key={i}>
                  <CircleImageButton src={tagButtonUrl[i]} onClick={() => setTagByIndex(i)} selected={selectedIndex[i] === 1 ? true : false} />
                </div>
              ))}
              <div
                className="fixed right-0 min-h-[48px] max-h-[60px] h-[16vh] w-10 bg-gradient-to-r from-transparent to-[#ffffff]"
                style={{ filter: 'blur(4px)' }}
              ></div>
            </div>
            <div className="flex h-[24px] my-[6px] ml-[13px] items-center">
              <div className="checkbox-wrapper-4">
                <input className="inp-cbx" id="selectAll" type="checkbox" checked={selectAll} onChange={() => handleSelectAll(selectAll)} />
                <label className="cbx" htmlFor="selectAll">
                  <span>
                    <svg width="12px" height="10px">
                      <use xlinkHref="#check-4"></use>
                    </svg>
                  </span>
                </label>
                <svg className="inline-svg">
                  <symbol id="check-4" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>
              <span
                onClick={() => {
                  handleSelectAll(selectAll)
                }}
                className={`text-[14px] ml-1 mb-[2.5px] cursor-pointer select-none ${
                  selectAll ? 'weight-500 text-turquoise' : 'weight-400 text-gray-3'
                } transform-gpu transition-colors duration-100`}
              >
                전체 선택
              </span>
            </div>
            <div className="ml-[17px] h-[36px] mt-[17px] flex items-center">
              <span className="text-[13px] font-700 text-gray-4 select-none">공식영상</span>
            </div>
            <div className="ml-[17px] w-[calc(100vw-24px)] h-[36px] flex items-center space-x-2 overflow-x-auto flex-nowrap scrollbar-hide">
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(0)
                }}
                width="80px"
                text="공식 유튜브"
                selected={postTagIndex === 0}
              />
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(1)
                }}
                width="53px"
                text="자컨"
                selected={postTagIndex === 1}
              />
            </div>
            <div className="ml-[17px] h-[36px] mt-[13px] flex items-center">
              <span className="text-[13px] font-700 text-gray-4 select-none">팬영상</span>
            </div>
            <div className="ml-[17px] w-[calc(100vw-24px)] h-[36px] flex items-center space-x-2 overflow-x-auto flex-nowrap scrollbar-hide">
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(2)
                }}
                width="60px"
                text="콘서트"
                selected={postTagIndex === 2}
              />
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(3)
                }}
                width="68px"
                text="팬사인회"
                selected={postTagIndex === 3}
              />
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(4)
                }}
                width="60px"
                text="팬튜브"
                selected={postTagIndex === 4}
              />
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(5)
                }}
                width="53px"
                text="기타"
                selected={postTagIndex === 5}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
