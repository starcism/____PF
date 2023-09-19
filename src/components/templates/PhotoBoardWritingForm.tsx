'use client'

import React, { useEffect, useRef, useState } from 'react'
import '@/styles/checkbox.css'
import { useRouter } from 'next/navigation'
import checkEnvironment from '@/libs/checkEnvironment'
import Image from 'next/image'
import { CircleImageButton, OptionalButton } from '../atoms/Button'
import Tag from '../atoms/Tag'
import { useAccessTokenState } from '@/libs/AccessTokenProvider'

export default function PhotoBoardWritingForm() {
  const router = useRouter()
  const { accessToken } = useAccessTokenState()
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleWritingForm: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.replace('/photo')
  }

  const [selectedIndex, setSelectedIndex] = useState([0, 0, 0, 0, 0, 0])
  const [selectAll, setSelectAll] = useState(false)
  const nameTags = ['유진', '가을', '레이', '원영', '리즈', '이서']
  const postTags = ['트위터', '인스타', '공카', 'SNS', '직찍', '타팬', '팬사진']
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
  const [value, setValue] = useState<string>('')

  const PreventKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //텍스트 영역 포커스 이동 방지
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault()
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

    const tagUnSelected = selectedIndex.every((element) => element === 0)

    if (postTagIndex === null || tagUnSelected) {
      alert('태그를 선택해주세요')
      setIsSubmit(false)
      return
    }

    if (images.file.length === 0) {
      alert('사진을 업로드해주세요')
      setIsSubmit(false)
      return
    }

    const formData = new FormData()
    images.file.forEach((file) => {
      formData.append('images', file)
      const extension = file.name.split('.').pop()
      if (extension) {
        formData.append('extensions', extension)
      }
    })

    const tag = selectedIndex.join('')
    const postTag = postTagIndex !== null && postTags[postTagIndex]

    formData.append('title', title)
    formData.append('tag', tag)
    if (postTag) {
      formData.append('postTag', postTag)
    }

    try {
      const res = await fetch(checkEnvironment().concat('/api/board/photo'), {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      if (res.status === 200) {
        router.push('/photo')
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
      <form onSubmit={submitPost} encType="multipart/form-data">
        <div className="fixed top-0 z-[1010] w-full max-w-[768px] h-[54px]" style={{ margin: '0 auto' }}>
          <div className="flex-col justify-center">
            <div className="w-full h-[53px] custom-border-b-1 bg-white">
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
                  <h1 className="text-[13px] text-gray-3 select-none">갤러리</h1>
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
        <div className="w-full mt-[54px] overflow-x-hidden" style={{ margin: '0 auto' }}>
          <div className="flex max-w-[768px] w-full justify-center">
            <>
              <div className="flex-col max-w-[768px] w-full">
                <div className="flex items-center h-[120px] max-w-[768px] w-full overflow-x-auto flex-nowrap scrollbar-hide py-[12px] px-[0px] bg-white">
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
                      <div className="flex-shrink-0 ml-4 w-[48px] h-[48px] rounded-full border-solid border border-lightgold justify-center items-center flex transition-transform transform-gpu active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-4 cursor-pointer">
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        <input id="imageInput" type="file" accept=".jpg, .jpeg, .png" multiple className="hidden" onChange={uploadImage} ref={fileInputRef} />
                      </div>
                    </label>
                  )}
                </div>
                <div className="flex overflow-hidden max-w-[768px] justify-center w-full my-[0.2rem]">
                  <textarea
                    className="flex w-full h-[100px] leading-[26px] max-w-[768px] px-[15px] outline-none resize-none text-[16px] scrollbar-hide font-350 placeholder:text-gray-3"
                    placeholder="코멘트를 남겨보세요"
                    maxLength={100}
                    onKeyDown={PreventKeyDown}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    ref={titleRef}
                  />
                </div>
                <div className="w-[calc(100%-26px)] max-w-[768px] min-h-[68px] place-content-center mx-[13px] grid-tags custom-border-b-0">
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
              </div>
            </>
          </div>
          <div className="flex-col justify-center items-center w-full h-[70vh]">
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
              <span className="text-[13px] font-700 text-gray-4 select-none">공식사진</span>
            </div>
            <div className="ml-[17px] w-[calc(100vw-24px)] h-[36px] flex items-center space-x-2 overflow-x-auto flex-nowrap scrollbar-hide">
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(0)
                }}
                width="60px"
                text="트위터"
                selected={postTagIndex === 0}
              />
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(1)
                }}
                width="60px"
                text="인스타"
                selected={postTagIndex === 1}
              />
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(2)
                }}
                width="75px"
                text="공식카페"
                selected={postTagIndex === 2}
              />
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(3)
                }}
                width="48px"
                text="SNS"
                selected={postTagIndex === 3}
              />
            </div>
            <div className="ml-[17px] h-[36px] mt-[13px] flex items-center">
              <span className="text-[13px] font-700 text-gray-4 select-none">팬사진</span>
            </div>
            <div className="ml-[17px] w-[calc(100vw-24px)] h-[36px] flex items-center space-x-2 overflow-x-auto flex-nowrap scrollbar-hide">
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(4)
                }}
                width="53px"
                text="직찍"
                selected={postTagIndex === 4}
              />
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(5)
                }}
                width="53px"
                text="타팬"
                selected={postTagIndex === 5}
              />
              <OptionalButton
                onClick={() => {
                  setPostTagIndex(6)
                }}
                width="53px"
                text="기타"
                selected={postTagIndex === 6}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
