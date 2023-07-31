'use client'

import { useState } from 'react'

export type ContainerVariant = keyof typeof containerVariants
export type InputVariant = keyof typeof InputVariants

interface Props {
  size: ContainerVariant | InputVariant
  type: string
  placeholder: string
  inputBorder?: TBorder
  isClearButton?: boolean
}

type TBorder = 'sm' | 'm' | 'lg' | undefined

const containerVariants = {
  m_sm: "h-[3rem]",
  m_m: "h-[3.5rem]",
  m_lg: "h-[4rem]",
  sm: "",
  m: "",
  lg: "",
}

const InputVariants = {
  m_sm: "h-[2rem]",
  m_m: "h-[2.5rem]",
  m_lg: "h-[3rem]",
  sm: "",
  m: "",
  lg: "",
}

const inputBorder = (e: TBorder) => {
  return e
}

const styles = {
  container: ({ size, inputBorder }: { size: ContainerVariant; inputBorder: TBorder }) => [
    containerVariants[size],
    "w-full flex items-center",
    inputBorder === 'sm' && `rounded-[0.375rem]`,
    inputBorder === 'm' && `rounded-[0.5rem]`,
    inputBorder === 'lg' && `rounded-[0.625rem]`,
  ].filter(Boolean).join(' '),
  input: ({ size }: { size: InputVariant }) => [
    InputVariants[size],
    "flex items-center w-full border-none outline-none ml-[1rem] text-[1rem] p-[0.6rem 0.8rem]",
  ].filter(Boolean).join(' '),
};

export default function Input({ size, type, placeholder, inputBorder = undefined, isClearButton = false }: Props) {
  const [inputValue, setInputValue] = useState('')
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      <div className={styles.container({ size, inputBorder })}>
        <input className={styles.input({ size })} onChange={handleInputValue} type={type} placeholder={placeholder} value={inputValue} />
        {isClearButton && (
          <button
            className="h-[2rem] w-[2rem] flex items-center justify-center mr-1 text-[#373737] rounded-[50%] hover:bg-[gba(0, 0, 0, 0.05)] duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  )
}
