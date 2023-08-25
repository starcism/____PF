'use client'

import { MainMenuContext } from '@/libs/MainMenuProvider'
import { useContext } from 'react'
import LinkContainer from '../atoms/LinkContainer'
import { usePathname, useRouter } from 'next/navigation'

export default function LinkWithCloseMenu({ pageHref, pageName }: { pageHref: string; pageName: string }) {
  const { handleMainMenu } = useContext(MainMenuContext)
  const pathname = usePathname()
  const router = useRouter()
  const boardType = ['/notice', '/forum', '/photo', '/video']
  const fontStyle = pathname === pageHref ? 'text-turquoise weight-500' : 'text-gray-4 weight-400'

  return (
    <>
      <div>
        <LinkContainer
          href={pageHref}
          size="m_menu_page"
          onClick={() => {
            handleMainMenu(false)
          }}
        >
          <span className={`ml-4 text-[1rem] leading-[0.8] ${fontStyle}`}>{pageName}</span>
        </LinkContainer>
      </div>
    </>
  )
}
