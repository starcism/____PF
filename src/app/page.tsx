'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import YoutubeViewer from '@/components/atoms/YoutubeViewer'
import PhotoViewer from '@/components/molecules/PhotoViwer'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  // const [data, setData] = useState()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(`https://df6pvglhk0.execute-api.ap-northeast-2.amazonaws.com/20230817/board/free?pageIndex=2`, {
  //       method: 'GET',
  //     })
  //     const data = await res.json()
  //     console.log(data)
  //   }
  //   fetchData()
  // }, [])
  return (
    <>
      <div className="flex pl-4 pt-8">
        일정표
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/* <button onClick={() => console.log(accessToken)}>버튼</button> */}
      <div className="mt-[52px] h-[100px] w-full bg-white flex items-center font-sans text-[14px] font-500 justify-center">Main</div>
      <YoutubeViewer url={'https://youtu.be/6ZUIwj3FgUY?si=YkHxng_JUhCpJcUI'} full={true} />
      <LoadingSpinner />
    </>
  )
}
