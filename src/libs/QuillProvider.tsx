'use client'

import dynamic from 'next/dynamic'
import React, { createContext, useState } from 'react'

const QuillReader = dynamic(() => import('@/libs/QuillReader'), {
  ssr: false,
  loading: () => (
    <>
      <div className="h-[150px] w-[100vw] max-w-[800px]">
        <div className="h-[20px] w-[40px] bg-gray-3" />
        <div className="h-[20px] w-[40px] bg-gray-3" />
        <div className="h-[20px] w-[40px] bg-gray-3" />
      </div>
    </>
  ),
})

interface Context {
  reader: React.ReactNode | null
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const QuillContext = createContext<Context>({ reader: null, setValue: (): void => {} })

export default function QuillProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState('')
  const reader = <QuillReader value={value} />

  return <QuillContext.Provider value={{ reader, setValue }}>{children}</QuillContext.Provider>
}
