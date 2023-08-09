'use client'

import VideoBoardWritingForm from '@/components/templates/VideoBoardWritingForm'
import useAuth from '@/libs/useAuth'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const { loading, error } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <>
        <div>로딩중</div>
      </>
    )
  } else if (error) {
    return (
      <>
        <div className="flex flex-col w-[100vw] h-[100vh] items-center justify-center">
          <h1 className="text-[16px]">권한이 없습니다.</h1>
          <button onClick={() => router.back()} className="flex items-center my-4 justify-center rounded-[10px] w-[80px] h-[28px] bg-lightgold">
            <span className="text-[14px]">돌아가기</span>
          </button>
        </div>
      </>
    )
  }
  return (
    <>
      <VideoBoardWritingForm />
    </>
  )
}
