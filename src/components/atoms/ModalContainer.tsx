'use client'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

interface Props {
  children?: React.ReactNode
  id?: number
  confirmType?: string
  onClick?: () => void
}

interface SetVideoProps {
  children: React.ReactNode
  setUrl: (url: string) => void
}

interface ConfirmProps extends Omit<Props, 'onClick'> {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isAuthor?: boolean
}

interface ModalProps {
  show: boolean
  close: () => void
  children: React.ReactNode
}

export default function ModalContainer({ children, id, onClick = undefined }: Props) {
  const [isModal, setIsModal] = useState(false)

  const openModal = () => {
    setIsModal(true)
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`
  }

  const closeModal = () => {
    setIsModal(false)
    const scrollY = document.body.style.top
    document.body.style.cssText = ''
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
  }

  useEffect(() => {
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  return (
    <>
      {isModal && (
        <Modal show={isModal} close={closeModal}>
          <div className="flex items-center justify-center w-[200px] h-[200px] bg-white rounded-[10px]">{id}</div>
        </Modal>
      )}
      <div onClick={() => openModal()}>{children}</div>
    </>
  )
}

export function ModalSetVideo({ children, setUrl }: SetVideoProps) {
  const [isModal, setIsModal] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [alert, setAlert] = useState(false)
  const [value, setValue] = useState<string>('')
  const urlRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //텍스트 영역 포커스 이동 방지
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const openModal = () => {
    setIsModal(true)
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`
  }

  const closeModal = () => {
    setIsModal(false)
    const scrollY = document.body.style.top
    document.body.style.cssText = ''
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
  }

  const urlCheck = (s: string) => {
    if (s) {
      const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})(\?.*)?$/

      if (s.match(youtubePattern)) {
        setIsValid(true)
        setAlert(false)
      } else {
        setIsValid(false)
        setAlert(true)
      }
    } else {
      setAlert(false)
    }
  }

  useEffect(() => {
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  return (
    <>
      {isModal && (
        <Modal show={isModal} close={closeModal}>
          <div className="flex items-center justify-between w-full h-[22px] bg-white">
            <span>공유</span>
            <button type="button" onClick={() => closeModal()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex border border-solid border-gray-3 rounded-[15px] w-[80vw] max-w-[450px] mt-[20px] mb-[5px]">
            <input
              className="flex w-full h-[44px] px-[15px] outline-none resize-none text-[14px] rounded-[15px] overflow-y-auto scrollbar-hide font-350 placeholder:text-gray-3 placeholder:text-[14px]"
              placeholder="youtu.be/... 또는 www.youtube.com/..."
              maxLength={100}
              onKeyDown={handleKeyDown}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                urlCheck(e.target.value)
              }}
              ref={urlRef}
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (isValid) {
                  setUrl(value.trim())
                }
              }}
              type="button"
              className={`flex font-sans font-700 ${isValid ? 'text-turquoise' : 'text-gray-2 cursor-default'} justify-center items-center h-[44px] w-[64px] text-[14px]`}
            >
              등록
            </button>
          </div>
          <div className="h-[15px] w-full">{alert && <small className="text-[12px] text-red-400">올바른 주소를 입력해 주세요</small>}</div>
        </Modal>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation()
          openModal()
        }}
      >
        {children}
      </div>
    </>
  )
}

export function ConfirmModal({ isAuthor, children, confirmType = 'post', onClick }: ConfirmProps) {
  const [isModal, setIsModal] = useState(false)
  const message = confirmType === 'post' ? '게시글을 삭제할까요?' : confirmType === 'comment' ? '댓글을 삭제할까요?' : ''
  const openModal = () => {
    setIsModal(true)
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`
  }

  const closeModal = () => {
    setIsModal(false)
    const scrollY = document.body.style.top
    document.body.style.cssText = ''
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
  }

  useEffect(() => {
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  return (
    <>
      {isModal && (
        <Modal show={isModal} close={closeModal}>
          <div className="flex items-center justify-center w-[200px] h-[200px] bg-white rounded-[10px]">{message}</div>
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClick(e)
              }}
              type="button"
              className={`w-1/2 h-[50px] ${isAuthor ? 'text-turquoise' : 'text-gray-3'}`}
            >
              확인
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeModal()
              }}
              type="button"
              className="w-1/2 h-[50px]"
            >
              취소
            </button>
          </div>
        </Modal>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation()
          openModal()
        }}
      >
        {children}
      </div>
    </>
  )
}

const Modal = ({ show, close, children }: ModalProps) => {
  if (show) {
    return (
      <div className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(34,34,34,.5)] z-[1010]" onMouseDown={() => close()}>
        <div
          className="absolute w-auto h-auto p-[20px] [box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] bg-white [z-index: 999]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* <button className="absolute top-[14px] right-[20px] decoration-0" onClick={() => close(!show)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
          {/* <div>
            <p className="text-center py-[18px] text-[18px] min-h-[60px] leading-[22px] weight-700 text-black tracking-[0.15px]"></p>
          </div> */}
          {children}
        </div>
      </div>
    )
  }
  return <></>
}
