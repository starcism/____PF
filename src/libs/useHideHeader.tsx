'use client'

// useHideHeader.tsx

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function useHideHeader({
  hideHeaderUrls = undefined,
  showSubHeaderUrls = undefined,
}: {
  hideHeaderUrls?: string[]
  showSubHeaderUrls?: string[]
}) {
  const pathname = usePathname()
  const [shouldHideHeader, setShouldHideHeader] = useState(false)
  const [shouldHideSubHeader, setShouldHideSubHeader] = useState(false)

  useEffect(() => {
    if (hideHeaderUrls) {
      const isCurrentPathMatched = hideHeaderUrls.some((path) => pathname === path)
      setShouldHideHeader(isCurrentPathMatched)
    }
    if (showSubHeaderUrls) {
      const isCurrentPathMatched = showSubHeaderUrls.some((path) => pathname === path)
      setShouldHideSubHeader(!isCurrentPathMatched)
    }
    
  }, [pathname, hideHeaderUrls, showSubHeaderUrls])

  return [shouldHideHeader, shouldHideSubHeader]
}
