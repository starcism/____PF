'use client'

import Image from 'next/image'

export default function UserIcon() {
  return (
    <>
      <div className="min-w-[36px] w-[36px] h-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full flex items-center justify-center">
        <Image draggable={false} alt="liz" src="/images/liz1.jpeg" width={36} height={36} className="w-[36px] h-[36px] rounded-full select-none" />
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
