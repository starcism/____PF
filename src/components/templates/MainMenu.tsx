'use client'

import { useSession } from 'next-auth/react'
import React from 'react'
import ProfileLinkOnMenu from '../organisms/ProfileLinkOnMenu'
import PageLinkOnMenu from '../organisms/PageLinkOnMenu'
import FootLinkOnMenu from '../organisms/FootLinkOnMenu'
import Footer from '../molecules/Footer'

export default function MainMenu() {
  const { data: session } = useSession()

  return (
    <div className="fixed left-0 top-[52px] h-[calc(100vh-52px)] w-full bg-white z-[1002]">
      <ProfileLinkOnMenu session={session} />
      <PageLinkOnMenu />
      <FootLinkOnMenu session={session} />
      <Footer />
    </div>
  )
}
