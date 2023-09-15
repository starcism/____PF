'use client'

import Image from 'next/image'

interface Props {
  size?: string
}

export default function UserIcon({ size = '36' }: Props) {
  return (
    <>
      <div className={`min-w-[${size}px] w-[${size}px] h-[${size}px] min-h-[${size}px] max-w-[${size}px] max-h-[${size}px] rounded-full flex items-center justify-center`}>
        <Image draggable={false} alt="liz" src="/images/liz1.jpeg" width={parseInt(size, 10)} height={parseInt(size, 10)} className={`w-[${size}] h-[${size}] rounded-full select-none`} />
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
