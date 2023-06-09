'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import ProfileLinkOnMenu from '../organisms/ProfileLinkOnMenu'
import PageLinkOnMenu from '../organisms/PageLinkOnMenu'
import FootLinkOnMenu from '../organisms/FootLinkOnMenu'
import Footer from '../molecules/Footer'

type BlockInteractionEvent = MouseEvent | TouchEvent | WheelEvent;

export default function MainMenu() {
  const { data: session } = useSession()
  useEffect(() => {
    const blockInteraction = (e: BlockInteractionEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    document.addEventListener('mousedown', blockInteraction)
    document.addEventListener('touchstart', blockInteraction)
    document.addEventListener('wheel', blockInteraction, { passive: false })

    return () => {
      document.removeEventListener('mousedown', blockInteraction)
      document.removeEventListener('touchstart', blockInteraction)
      document.removeEventListener('wheel', blockInteraction)
    }
  }, [])

  return (
    <>
      <div className="fixed left-0 top-[52px] h-[calc(100vh-52px)] w-[100vw] bg-white z-[1002]">
        <ProfileLinkOnMenu session={session} />
        <PageLinkOnMenu />
        <FootLinkOnMenu session={session} />
        <Footer />
      </div>
    </>
  )
}
