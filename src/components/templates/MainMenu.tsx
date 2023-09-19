'use client'

import React, { useEffect } from 'react'
import ProfileLinkOnMenu from '../organisms/ProfileLinkOnMenu'
import PageLinkOnMenu from '../organisms/PageLinkOnMenu'
import FootLinkOnMenu from '../organisms/FootLinkOnMenu'
import Footer from '../molecules/Footer'
import { useAccessTokenState } from '@/libs/AccessTokenProvider'

type BlockInteractionEvent = MouseEvent | TouchEvent | WheelEvent

export default function MainMenu() {
  const { accessToken, loading } = useAccessTokenState()

  useEffect(() => {
    const blockInteraction = (e: BlockInteractionEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    document.addEventListener('mousedown', blockInteraction)
    // document.addEventListener('wheel', blockInteraction, { passive: false })

    return () => {
      document.removeEventListener('mousedown', blockInteraction)
      // document.removeEventListener('wheel', blockInteraction)
    }
  }, [])

  return (
    <>
      <div onMouseDown={(e) => e.stopPropagation()} className="fixed top-[52px] h-[calc(100vh-52px)] w-full max-w-[479px] bg-white z-[1000] border-r-[0.5px] shadow-2xl border-solid border-r-gray-2">
        {loading ? <ProfileLinkOnMenu loading={true} /> : <ProfileLinkOnMenu session={accessToken} />}
        <PageLinkOnMenu />
        {loading ? <FootLinkOnMenu loading={true} /> : <FootLinkOnMenu session={accessToken} />}
        <Footer />
      </div>
    </>
  )
}
