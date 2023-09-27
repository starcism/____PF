'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import generateRandomSecretKey from '@/libs/generateSecretKey'
import Image from 'next/image'

export default function Home() {

  return (
    <>
      <div className="w-full aspect-[1000/666] max-h-[511px] relative">
        <Image src="/images/_IHAVEIVE.webp" fill alt="w-full h-auto _blank" />
      </div>
    </>
  )
}
