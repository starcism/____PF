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
    <button type="button" onClick={onClick}>
      <div
        className={`min-w-[52px] max-w-[56px] w-[15vw] h-full rounded-full aspect-square ${
          selected ? 'ring-[3px] ring-lightblue' : 'ring-[1.5px] ring-white'
        } transform-gpu transition-all duration-150`}
      >
        <Image src={src} width={100} height={100} priority={true} alt="tag" className="w-full h-full rounded-full select-none" />
      </div>
    </button>
  )
}
export function OptionalButton({ onClick, width, text, selected }: OBProps) {
  return (
    <button className={`w-[${width}] flex flex-shrink-0 items-center justify-center bg-white border border-gray-1 h-[28px] my-1 rounded-[20px] transition-transform transform-gpu active:scale-95`}>
      <span className="text-gray-2 text-[12px]">{text}</span>
    </button>
  )
}
