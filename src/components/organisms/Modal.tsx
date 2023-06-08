'use Client'
import React, { SetStateAction } from 'react'

interface IProps {
  show: boolean
  close: React.Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

const Modal = ({ show, close, children }: IProps) => {
  if (show) {
    return (
      <div className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(34,34,34,.5)] z-1010" onMouseDown={() => close(!show)}>
        <div className="text-center py-4 text-[18px] weight-700 min-h-60 leading-22 text-black tracking-[0.15px]" onMouseDown={(e) => e.stopPropagation()}>
          <button className="absolute top-[14px] right-[20px] decoration-0" onClick={() => close(!show)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
            <p className="text-center py-[18px] text-[18px] min-h-[60px] leading-[22px] weight-700 text-black tracking-[0.15px]"></p>
          </div>
          {children}
        </div>
      </div>
    )
  }
  return <></>
}

export default Modal
