import React from 'react'
import '@/styles/global.css'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import Header from '@/components/organisms/Header'
import AccessTokenProvider from '@/libs/AccessTokenProvider'
import MainMenuProvider from '@/libs/MainMenuProvider'
import { cls } from '@/libs/cls'
import QuillProvider from '@/libs/QuillProvider'
import Head from 'next/head'
import UserProvider from '@/libs/UserProvider'

export const metadata = {
  title: {
    default: 'LOVEDIVE',
  },
  description: '설명',
}

interface RootLayoutProps {
  children: React.ReactNode
}

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className={cls(notoSansKR.className, inter.variable)}>
      <body className="scrollbar-hide mx-auto min-h-[100vh] h-full max-w-[768px] shadow-xl shadow-semigold layout-border">
        <AccessTokenProvider>
          <UserProvider>
            <MainMenuProvider>
              <Header />
              <QuillProvider>{children}</QuillProvider>
            </MainMenuProvider>
          </UserProvider>
        </AccessTokenProvider>
      </body>
    </html>
  )
}
