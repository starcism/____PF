import React from 'react'
import '@/styles/global.css'
import Header from '@/components/organisms/Header'
import AuthContext from '@/libs/AuthContext'
import { MainMenuProvider } from '@/libs/ContextProvider'

export const metadata = {
  title: {
    default: 'SWITHy',
  },
  description: '스테이씨 팬 커뮤니티, 스윗을 위한 공간',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head />
      <body>
        <AuthContext>
          <MainMenuProvider>
            <Header hideHeaderUrls={['/auth']} showSubHeaderUrls={['/free', '/notice', '/photo', '/video']}>
              {children}
            </Header>
          </MainMenuProvider>
        </AuthContext>
      </body>
    </html>
  )
}
