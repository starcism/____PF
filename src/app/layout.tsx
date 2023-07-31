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
      <head />
      <body>
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
