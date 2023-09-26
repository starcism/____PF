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
      {/* <div className="w-full h-[300px] flex">
        <div className="w-1/2 h-full p-[20px]">
          <div className="rounded-[10px] w-full h-full bg-gray-0 flex justify-center items-center">공지</div>
        </div>
        <div className="w-1/2 h-full p-[20px]">
          <div className="rounded-[10px] w-full h-full bg-gray-0 flex justify-center items-center">일정표</div>
        </div>
      </div> */}
      {/* <LoadingSpinner /> */}
      {/* <button onClick={() => console.log(accessToken)}>버튼</button> */}
      {/* <div className="flex w-full h-[200px] justify-center items-center">
        <Image src="/images/heart.png" width={100} height={100} className="rounded-full shadow-lg shadow-darkgold" alt="__blank" />
      </div> */}
    </>
  )
}
