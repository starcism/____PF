'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'

interface Props {
  children?: React.ReactNode
  id?: number
  confirmType?: string
}

interface ConfirmProps extends Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isAuthor?: boolean
}

interface ModalProps {
  show: boolean
  close: () => void
  children: React.ReactNode
}

export default function ModalContainer({ children, id }: Props) {
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
          className="absolute w-[200px] h-auto [box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] bg-white [z-index: 999]"
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
