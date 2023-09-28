'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import login_kakao from '@/utils/login_kakao.png'
import login_naver from '@/utils/login_naver.png'
import axios from 'axios'
import checkEnvironment from '@/libs/checkEnvironment'

const imgUrlsMobile = [
  '/images/login_yujin_mobile.jpeg',
  '/images/login_gaeul_mobile.jpeg',
  '/images/login_rei_mobile.jpeg',
  '/images/login_wonyo_mobile.jpeg',
  '/images/login_liz_mobile.jpeg',
  '/images/login_leeseo_mobile.jpeg',
]

const imgUrlsFull = [
  '/images/login_yujin_full.jpeg',
  '/images/login_gaeul_full.jpeg',
  '/images/login_rei_full.jpeg',
  '/images/login_wonyo_full.jpeg',
  '/images/login_liz_full.jpeg',
  '/images/login_leeseo_full.jpeg',
]

export default function Page() {
  const router = useRouter()
  const handleSignIn = async (loginMethod: string) => {
    if (loginMethod === 'kakao') {
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
    } else if (loginMethod === 'naver') {
      return alert('카카오 로그인을 이용해 주세요')
    }
  }

  // const [deviceType, setDeviceType] = useState(window && window.innerWidth > 479 ? 'full' : 'mobile')

  // useEffect(() => {
  //   function handleResize() {
  //     const newVW = window.innerWidth
  //     if (newVW > 479) {
  //       setDeviceType('full')
  //     } else {
  //       setDeviceType('mobile')
  //     }
  //   }

  //   window.addEventListener('resize', handleResize)

  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  const [randomIndex, setRandomIndex] = useState<number>(Math.floor(Math.random() * 6))

  return (
    <div className="fixed w-full max-w-[767px] h-full bg-gray-0">
      <div className="relative w-full max-w-[767px] h-full">
        {<Image src={imgUrlsMobile[randomIndex]} width={500} height={500} alt="_ive" priority={true} className="relative w-full h-full object-cover" />}
      </div>
      {/* <div className="max-w-[1000px] max-h-[1500px]">
          <Image
            alt=""
            src="/images/rei_login.jpeg"
            fill
            className="-z-10"
            style={{
              // objectPosition: 'right top',
              position: 'absolute',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              marginLeft: 'auto', // 이미지를 수평 중앙에 위치
              marginRight: 'auto', // 이미지를 수평 중앙에 위치
            }}
          />
        </div> */}
      <div className="p-[20px] fixed top-0">
        <button type="button" className="text-semigold rounded-full w-[40px] h-[40px] flex items-center justify-center" onClick={() => router.push('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="fixed w-full max-w-[768px] justify-center bottom-[20%] md:bottom-[25%]">
        <div className="flex justify-center w-full h-full bg-transparent">
          <div className="max-w-[353px] min-w-[287px] w-[66%] h-[40%] bg-white rounded-[20px]">
            <div className="flex-col w-full h-full">
              <div className="flex w-full h-[58px] justify-center items-center">
                <h2 className="text-[16px] weight-500 text-black">회원가입</h2>
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
    </div>
  )
}
