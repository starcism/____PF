'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import dynamic from 'next/dynamic'
import React, { createContext, useState } from 'react'

const QuillReader = dynamic(() => import('@/libs/QuillReader'), {
  loading: () => <LoadingSpinner isPost={true} />,
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
