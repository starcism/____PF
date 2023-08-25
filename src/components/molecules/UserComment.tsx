import { SetStateAction, useRef, useState } from 'react'
import UserIcon from '../atoms/UserIcon'

interface Props {
  value: string
  setValue: React.Dispatch<SetStateAction<string>>
}

export default function UserComment({ value, setValue }: Props) {
  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const commentRef = useRef<HTMLTextAreaElement>(null)
  const commentSideRef = useRef<HTMLDivElement>(null)
  const handleResizeHeight = () => {
    if (commentRef.current) {
      commentRef.current.style.height = '44px'
      if (commentSideRef.current) {
        commentSideRef.current.style.height = '44px'
      }
      if (commentRef.current.scrollHeight > commentRef.current.clientHeight) {
        const newHeight = commentRef.current.scrollHeight + 'px'
        commentRef.current.style.height = newHeight
        if (commentSideRef.current) {
          commentSideRef.current.style.height = newHeight
        }
      } else {
        commentRef.current.style.height = '44px'
        if (commentSideRef.current) {
          commentSideRef.current.style.height = '44px'
        }
      }
    }
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
    //줄바꿈 20개이상 제한
    if (e.key === 'Enter') {
      const lines = e.currentTarget.value.split('\n')
      if (lines.length >= 20) {
        e.preventDefault()
      }
    }
  }
  return (
    <>
      <div className="flex w-full py-[8px] pr-[8px]">
        <div className="h-full w-[40px] pt-[4px] mr-[8px] flex">
          <UserIcon />
        </div>
        <div className="flex border border-solid border-gray-3 rounded-[20px] w-[100vw]">
          <textarea
            className={`w-full max-h-[150px] rounded-[20px] leading-[22px] max-w-[800px] pl-[15px] py-[10px] outline-none resize-none text-[14px] overflow-y-auto scrollbar-hide font-400 placeholder:text-gray-3`}
            style={{ height: '44px' }}
            placeholder="댓글 달기"
            maxLength={500}
            onKeyDown={PreventKeyDown}
            ref={commentRef}
            onInput={() => handleResizeHeight()}
            value={value}
            onChange={handleTextareaValue}
          />
          <div className={`flex-col w-[80px] items-end justify-end max-h-[150px] rounded-[20px]`} ref={commentSideRef} style={{ height: '44px' }}>
            {value ? (
              <>
                <button className="flex font-sans font-700 text-turquoise justify-center items-center h-[44px] w-[64px] text-[14px]">등록</button>
                {commentSideRef.current && parseInt(commentSideRef.current.style.height, 10) > 50 && (
                  <div className="flex items-end justify-center min-h-0 h-[calc(100%-44px)] pb-[4px] pr-[4px] w-[64px]">
                    <span className="leading-[28px] text-[12px] text-gray-3">{`${value.length} / 500`}</span>
                  </div>
                )}
              </>
            ) : (
              <button className="flex justify-center font-sans text-lightgold text-outlined items-center h-full w-[64px] text-[14px]">GIF</button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
