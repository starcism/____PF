'use client'
import formatDate from '@/libs/getFormDate'
import login_kakao from '@/utils/login_kakao.png'
import Image from 'next/image'

interface Props {
  loginMethod: string
  createdAt: string
}

export default function ProfileInfo({ loginMethod = 'kakao', createdAt }: Props) {
  const signUpDate = createdAt && formatDate(createdAt, true)

  return (
    <>
      <div className="">
        <div className="w-full flex h-[20px] items-start">
          <div className="mr-[10px]">
            <span className="font-500 text-[14px]">가입일</span>
          </div>
          <div className="mr-[8px]">
            <span className="font-400 text-[14px] tracking-wide">{signUpDate}</span>
          </div>
          <div className="flex items-center justify-center w-[20px] h-[20px] outline-[1px] outline border border-solid border-lightgold outline-lightgold rounded-full bg-[#FEE500]">
            <Image alt="카카오로그인" src={login_kakao} width={10} />
          </div>
        </div>
      </div>
    </>
  )
}
