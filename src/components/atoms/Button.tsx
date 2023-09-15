'use client'

import Image from 'next/image'

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
    <div className="h-[68px] w-[68px] flex justify-center items-center">
      <button type="button" onClick={onClick}>
        <div className={`relative w-[54px] h-[54px] rounded-[100%] aspect-square ${selected ? 'tagButton' : 'unTagButton'} transform-gpu transition-all duration-100`}>
          <Image draggable={false} src={src} width={54} height={54} priority={true} alt="tag" className="w-full h-full rounded-full select-none" />
        </div>
      </button>
    </div>
  )
}

export function OptionalButton({ onClick, width, text, selected }: OBProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`w-[${width}] flex flex-shrink-0 items-center justify-center bg-white ${selected ? 'hover:bg-clicked-button-turquoise': 'hover:bg-hover-button'} border ${selected ? 'border-turquoise' : 'border-gray-1'} h-[28px] my-1 rounded-[20px] transition-transform transform-gpu active:scale-95`}
    >
      <span className={`${selected ? 'text-turquoise weight-500' : 'text-gray-3 weight-400'} text-[12px]`}>{text}</span>
    </button>
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
