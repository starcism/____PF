'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CIProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  src: string
  selected: boolean
}

interface OBProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  width: string
  text: string
  selected: boolean
}

export function CircleImageButton({ onClick, src, selected }: CIProps) {
  return (
    <button type="button" onClick={onClick}>
      <div
        className={`min-w-[52px] max-w-[56px] w-[15vw] h-full rounded-full aspect-square ${
          selected ? 'ring-[3px] ring-lightblue' : 'ring-[1.5px] ring-white'
        } transform-gpu transition-all duration-150`}
      >
        <Image src={src} fill priority={true} alt="tag" className="w-full h-full rounded-full select-none" />
      </div>
    </button>
  )
}
export function OptionalButton({ onClick, width, text, selected }: OBProps) {
  return (
    <button
      className={`w-[${width}] flex flex-shrink-0 items-center justify-center bg-white border border-gray-1 h-[28px] my-1 rounded-[20px] transition-transform transform-gpu active:scale-95`}
    >
      <span className="text-gray-2 text-[12px]">{text}</span>
    </button>
  )
}

export function ButtonToBackPage() {
  const router = useRouter()
  
  return (
    <>
      <button className="justify-center items-center" onClick={() => router.back()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
    </>
  )
}

// function chainingButton() {
//   return (
//     <div className="flex justify-center h-[3rem] px-[11px] pt-[18px] pb-[14px] mb-[200px]">
//       <div className="flex w-[100vw] max-w-[800px]">
//         <button className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-gray-1" type="submit">
//           <h1 className="text-viva-gray-4">취소</h1>
//         </button>
//         <button className="flex-one-third h-[40px] mx-[5px] px-[15px] rounded-[6px] bg-viva-6" type="submit">
//           <h1 className="text-viva-gray-4">등록</h1>
//         </button>
//       </div>
//     </div>
//   )
// }
