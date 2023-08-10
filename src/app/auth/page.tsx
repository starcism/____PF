'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import login_kakao from '@/utils/login_kakao.png'
import login_naver from '@/utils/login_naver.png'
import axios from 'axios'
import checkEnvironment from '@/libs/checkEnvironment'

export default function Page() {
  const router = useRouter()
  const handleSignIn = async (loginMethod: string) => {
    try {
      const response = await axios.get(checkEnvironment().concat('/api/auth/login'))
      if (response.status === 200) {
        window.open(response.data.authUrl, '카카오계정으로 로그인', 'width=400px,height=600px,scrollbars=yes')
      } else {
        return
      }
    } catch (error) {
      return
    }
  }

  return (
    <div className="h-screen w-screen bg-[#F8E9ED]">
      <div className="p-2">
        <button onClick={() => router.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex mt-12 items-center justify-center">
        <h1 className="text-[2rem]"></h1>
      </div>
      <div className="flex w-full mt-[17.1rem] justify-center">
        <div className="w-[19.9rem] h-[17.1rem] bg-white rounded-[1rem]">
          <div className="flex-col w-full h-full">
            <div className="flex w-full h-[4.1rem] justify-center items-center">
              <h2 className="text-[1.2rem]">회원가입</h2>
            </div>
            <div className="flex w-full h-[8.9rem] items-center">
              <div className="flex w-full h-[3.5rem] justify-center">
                <div>
                  <button onClick={() => handleSignIn('kakao')}>
                    <div className="flex items-center justify-center w-[3.5rem] h-[3.5rem] rounded-full bg-[#FEE500] mr-8">
                      <Image alt="카카오로그인" src={login_kakao} width={24} />
                    </div>
                  </button>
                </div>
                <div>
                  <button onClick={() => handleSignIn('naver')}>
                    <div className="w-[3.5rem] h-[3.5rem] rounded-full ml-8">
                      <Image alt="네이버로그인" src={login_naver} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-[4.1rem]">
              <h2 className="text-[0.9rem] text-gray-3">로그인에 문제가 있으신가요?</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
