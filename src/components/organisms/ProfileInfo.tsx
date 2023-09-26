'use client'
import checkEnvironment from '@/libs/checkEnvironment'
import formatDate from '@/libs/getFormDate'
import login_kakao from '@/utils/login_kakao.png'
import Image from 'next/image'
import { ResignModal } from '../atoms/ModalContainer'
import { useAccessTokenState } from '@/libs/AccessTokenProvider'
import { useRouter } from 'next/navigation'

interface Props {
  accessToken: string | null
  loginMethod: string
  createdAt: string
}

export default function ProfileInfo({ accessToken, loginMethod = 'kakao', createdAt }: Props) {
  const signUpDate = createdAt && formatDate(createdAt, true)
  const { setAccessToken } = useAccessTokenState()
  const router = useRouter()
  const resign = async () => {
    try {
      const res = await fetch(checkEnvironment().concat('/api/auth/resign'), {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      if (res.ok) {
        setAccessToken(null)
        router.back()
        return
      } else {
        const data = await res.json()
      }
    } catch (error) {
      return
    }
  }

  return (
    <>
      <div className="w-full flex justify-between">
        <div className="w-full flex h-[24px] items-center overflow-x-hidden text-clip flex-nowrap">
          <div className="flex mr-[10px] overflow-hidden text-clip flex-nowrap">
            <span className="font-500 text-[14px] overflow-hidden text-clip whitespace-nowrap">가입일</span>
          </div>
          <div className="flex mr-[8px] overflow-hidden text-clip flex-nowrap">
            <span className="font-400 text-[14px] tracking-wide overflow-hidden text-clip whitespace-nowrap">{signUpDate}</span>
          </div>
          <div className="flex items-center justify-center w-[20px] h-[20px] outline-[1px] outline border border-solid border-lightgold outline-lightgold rounded-full bg-[#FEE500]">
            <Image alt="카카오로그인" src={login_kakao} width={10} />
          </div>
        </div>
        <ResignModal onClick={resign}>
          <button className="max-w-[60px] h-[24px] flex items-center">
            <span className="text-[14px] text-gray-3 overflow-hidden text-clip whitespace-nowrap">탈퇴하기</span>
          </button>
        </ResignModal>
      </div>
    </>
  )
}
