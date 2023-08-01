import React from 'react'
import '@/styles/global.css'
import Header from '@/components/organisms/Header'
import AccessTokenProvider from '@/libs/AccessTokenProvider'
import MainMenuProvider from '@/libs/MainMenuProvider'

export const metadata = {
  title: {
    default: 'BOARD',
  },
  description: '설명',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0" />
      </head>
      <body className='overflow-y-auto scrollbar-hide'>
        <AccessTokenProvider>
          <MainMenuProvider>
            <Header />
            {children}
          </MainMenuProvider>
        </AccessTokenProvider>
      </body>
    </html>
  )
}
