'use client'

import YoutubeViewer from '@/components/atoms/YoutubeViewer'
import { getSession, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const uses = useSession()
  console.log(uses)

  return (
    <>
      <div className='mt-[52px] h-[100px] w-full bg-white flex items-center justify-center'>LOGO</div>
      <div className='flex items-center justify-center h-[300px] w-full bg-gray-1'>
        <YoutubeViewer url={'https://youtu.be/SxHmoifp0oQ'} hasBorderRadius={true} />
      </div>
    </>
  )
}
