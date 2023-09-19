'use client'

import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="w-full aspect-[1000/666] max-h-[511px] relative">
        <Image src="/images/_IHAVEIVE.webp" fill alt="w-full h-auto _blank" />
      </div>
      <div className="w-full h-[300px] flex">
        <div className="w-1/2 h-full p-[20px]">
          <div className="rounded-[10px] w-full h-full bg-gray-0 flex justify-center items-center">공지</div>
        </div>
        <div className="w-1/2 h-full p-[20px]">
          <div className="rounded-[10px] w-full h-full bg-gray-0 flex justify-center items-center">일정표</div>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg> */}
        </div>
      </div>
      {/* <button onClick={() => console.log(accessToken)}>버튼</button> */}
      {/* <div className="flex w-full h-[200px] justify-center items-center">
        <Image src="/images/heart.png" width={100} height={100} className="rounded-full shadow-lg shadow-darkgold" alt="__blank" />
      </div> */}
    </>
  )
}
