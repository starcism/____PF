'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import checkEnvironment from '@/libs/checkEnvironment'
import Image from 'next/image'

export default function PhotoBoardWritingForm() {
  const router = useRouter()
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleWritingForm: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.replace('/photo')
  }

  const [selectedIndex, setSelectedIndex] = useState([0, 0, 0, 0, 0, 0])
  const tags = ['단체샷', '가을', '유진', '레이', '원영', '리즈', '이서']
  const setTagByIndex = (index: number) => {
    const updatedSelectedIndex = [...selectedIndex]
    updatedSelectedIndex[index] = updatedSelectedIndex[index] ? 0 : 1
    setSelectedIndex(updatedSelectedIndex)
  }

  const [images, setImages] = useState<{ file: File[]; blob: string[] }>({
    file: [],
    blob: [],
  })

  //pc환경 중복 업로드 체크
  const isDuplicateFile = (selectedFile: File, uploadedFiles: File[]): boolean => {
    for (const file of uploadedFiles) {
      if (file.name === selectedFile.name && file.size === selectedFile.size) {
        return true
      }
    }
    return false
  }

  //텍스트 영역 핸들링
  const PreventKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //텍스트 영역 포커스 이동 방지
    if (e.key === 'Tab') {
      e.preventDefault()
      const { selectionStart, selectionEnd, value } = e.currentTarget
      const newValue = value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd)
      e.currentTarget.value = newValue
      e.currentTarget.setSelectionRange(selectionStart + 4, selectionStart + 4) // 커서 위치 조정
    }
    //줄바꿈 4개이상 제한
    if (e.key === 'Enter') {
      const lines = e.currentTarget.value.split('\n')
      if (lines.length >= 3) {
        e.preventDefault()
      }
    }
  }

  //이미지 업로드
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = e.target.files
    const fileArray = Array.from(files)
    const newFiles = fileArray.filter((file) => !isDuplicateFile(file, images.file))

    if (images.file.length + newFiles.length > 4) {
      return
    }

    if (newFiles.length === 0) {
      return
    }

    //미리보기용 blob 배열에 추가
    const newBlobs = newFiles.map((file) => {
      return window.URL.createObjectURL(file)
    })

    //업로드된 파일 배열에 추가
    setImages({
      file: [...images.file, ...newFiles],
      blob: [...images.blob, ...newBlobs],
    })
  }

  //업로드된 이미지 삭제
  const deleteImage = (id: number) => {
    window.URL.revokeObjectURL(images.blob[id])
    setImages({
      file: images.file.filter((_, i) => i !== id),
      blob: images.blob.filter((_, i) => i !== id),
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  //폼 제출
  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    images.file.forEach((file, index) => {
      formData.append(`image_${index}`, file)
    })

    const comment = commentRef.current?.value ?? ''
    formData.append('comment', comment)

    try {
      const response = await axios.post(checkEnvironment().concat('/api/photo'), formData)
      console.log(response.data) // 업로드 성공한 이미지 정보 확인
      router.push('/photo')
    } catch (error) {
      console.error(error)
    }
  }

  //언마운트시 메모리 비우기
  useEffect(() => {
    return () => {
      images.blob.forEach((blobUrl) => {
        window.URL.revokeObjectURL(blobUrl)
      })
    }
  }, [])

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
          <form onSubmit={submitPost}>
            <div className="flex w-[100vw] justify-center">
              <>
                <div className="flex-col w-[100vw] max-w-[800px]">
                  <div className="flex items-center h-[120px] w-[100vw] max-w-[800px] overflow-x-auto flex-nowrap scrollbar-hide py-[12px] px-[0px] bg-white">
                    {/* 이미지 미리보기 추가 */}
                    {images.blob &&
                      images.blob.map((blobUrl, index) => (
                        <div key={index} className="relative flex-shrink-0 h-[95px] w-[85px] ml-[20px] rounded-[10px]">
                          <button
                            type="button"
                            className="absolute top-0 right-0 text-gray-6 w-9 h-9 flex items-center justify-center"
                            onClick={() => deleteImage(index)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-[3px] mb-[3px]">
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <Image src={blobUrl} alt={`Image Preview`} width={0} height={0} sizes="100vh" className="h-full w-full rounded-[10px]" />
                        </div>
                      ))}
                    {/* 이미지 추가 버튼 */}
                    {images.blob && images.blob.length < 4 && (
                      <label className="cursor-pointer" htmlFor="imageInput">
                        <div className="flex-shrink-0 ml-4 w-[48px] h-[48px] rounded-full border-solid border border-lightgold justify-center items-center flex">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-4 cursor-pointer">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                          <input id="imageInput" type="file" accept="image/*" multiple className="hidden" onChange={uploadImage} ref={fileInputRef} />
                        </div>
                      </label>
                    )}
                  </div>
                  <div className="flex overflow-hidden justify-center w-[100vw] my-[0.2rem]">
                    <textarea
                      className="flex w-[100vw] h-[100px] leading-[26px] max-w-[800px] px-[15px] outline-none resize-none text-[16px] scrollbar-hide font-350 placeholder:text-gray-3"
                      placeholder="코멘트를 남겨보세요"
                      maxLength={100}
                      onKeyDown={PreventKeyDown}
                      ref={commentRef}
                    />
                  </div>
                  <div className="flex w-[calc(100vw-13px)] max-w-[800px] py-[12px] pl-[13px] custom-border-b-0">
                    <div className="flex min-h-[32px] items-center space-x-2 flex-wrap">
                      {tags.map(
                        (tag, index) =>
                          selectedIndex[index] === 1 && (
                            <div
                              key={index}
                              className="flex items-center justify-center bg-white w-[60px] h-[24px] my-1 rounded-[10px] border border-solid border-gray-2"
                            >
                              <span className="text-[12px] text-gray-4">{`#${tags[index]}`}</span>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </form>
          <div className="pl-[13px] flex-col w-[calc(100vw-13px)]">
            <div className="w-[calc(100vw-13px)] h-[36px] flex items-center">
              <span className="text-[13px] font-600">태그설정</span>
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
            <div className="flex pl-[4px] py-[12px] items-center w-[calc(100vw-13px)] overflow-x-auto flex-nowrap scrollbar-hide space-x-4">
              <button type="button" onClick={() => setTagByIndex(0)}>
                <div className="min-w-[36px] max-w-[48px] w-[16vw] h-full bg-blue-200 rounded-full aspect-square"></div>
              </button>
              <button type="button" onClick={() => setTagByIndex(1)}>
                <div className="min-w-[36px] max-w-[48px] w-[16vw] h-full bg-blue-200 rounded-full aspect-square"></div>
              </button>
              <button type="button" onClick={() => setTagByIndex(2)}>
                <div className="min-w-[36px] max-w-[48px] w-[16vw] h-full bg-blue-200 rounded-full aspect-square"></div>
              </button>
              <button type="button" onClick={() => setTagByIndex(3)}>
                <div className="min-w-[36px] max-w-[48px] w-[16vw] h-full bg-blue-200 rounded-full aspect-square"></div>
              </button>
              <button type="button" onClick={() => setTagByIndex(4)}>
                <div className="min-w-[36px] max-w-[48px] w-[16vw] h-full bg-blue-200 rounded-full aspect-square"></div>
              </button>
              <button type="button" onClick={() => setTagByIndex(5)}>
                <div className="min-w-[36px] max-w-[48px] w-[16vw] h-full bg-blue-200 rounded-full aspect-square"></div>
              </button>
              <button type="button" onClick={() => setTagByIndex(6)}>
                <div className="min-w-[36px] max-w-[48px] w-[16vw] h-full bg-blue-200 rounded-full aspect-square"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

{
  /* <div className="flex justify-center h-[3rem] px-[11px] pt-[18px] pb-[14px] mb-[200px]">
              <div className="flex w-[100vw] max-w-[800px]">
                <button className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-gray-1" onClick={() => setOnChange('')} type="submit">
                  <h1 className="text-gray-3">취소</h1>
                </button>
                <button onClick={(e) => handleSubmit(e)} className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-gray-2" type="submit">
                  <h1 className="text-black">등록</h1>
                </button>
              </div>
            </div> */
}
