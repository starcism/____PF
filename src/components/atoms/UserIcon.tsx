'use client'

import Image from 'next/image'

interface Props {
  size?: string
  imgUrl?: string
}

export default function UserIcon({ size = '36' }: Props) {
  return (
    <>
      <div
        className={`min-w-[${size}px] w-[${size}px] h-[${size}px] min-h-[${size}px] max-w-[${size}px] max-h-[${size}px] rounded-full flex items-center justify-center`}
      >
        <Image
          draggable={false}
          alt="liz"
          src="/images/liz1.jpeg"
          width={parseInt(size, 10)}
          height={parseInt(size, 10)}
          className={`w-[${size}] h-[${size}] rounded-full select-none`}
        />
      </div>
    </>
  )
}

export function ChangableProfileImage({ size = '60', imgUrl = '/images/liz1.jpeg' }: Props) {
  return (
    <>
      <div className="relative">
        <div
          className={`min-w-[${size}px] w-[${size}px] h-[${size}px] min-h-[${size}px] max-w-[${size}px] max-h-[${size}px] rounded-full flex items-center justify-center`}
        >
          <Image
            draggable={false}
            alt="liz"
            src={imgUrl}
            width={parseInt(size, 10)}
            height={parseInt(size, 10)}
            className={`w-[${size}] h-[${size}] rounded-full select-none`}
          />
        </div>
        <button type='button' className="absolute flex items-center justify-center h-[22px] w-[22px] rounded-full bg-turquoise border-2 border-white border-solid text-white -right-[2px] -bottom-[2px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </>
  )
}

export function DummyIcon() {
  return (
    <>
      <div className="min-w-[36px] w-[36px] h-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full flex items-center justify-center bg-darkgold" />
    </>
  )
}
