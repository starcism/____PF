'use client'

import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
  boardType: string
}

export default function PostLayout({ children, boardType }: Props) {
  const router = useRouter()
  return (
    <>
      <div className="fixed top-0 z-[1010] max-w-[767px] h-[53px] w-full bg-white">
        <div className="w-full h-[53px] custom-border-1 bg-white">
          <div className="flex justify-between items-center">
            <div className="h-[53px] w-[53px] flex justify-center items-center">
              <button
                className="justify-center items-center"
                onClick={() => {
                  router.back()
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <h1 className="text-[16px] font-500 text-gray-4 select-none">{boardType}</h1>
            </div>
            <div className="h-[53px] w-[53px] flex justify-center items-center select-none" />
          </div>
        </div>
      </div>
      <div className="pt-[54px]">{children}</div>
    </>
  )
}
