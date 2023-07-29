'use client'

import { MainMenuContext } from '@/libs/MainMenuProvider'
import { useContext } from 'react'
import LinkContainer from '../atoms/LinkContainer'

export default function LinkWithCloseMenu({ pageHref, pageName }: { pageHref: string; pageName: string }) {
  const { handleMainMenu } = useContext(MainMenuContext)

  return (
    <>
      <div>
        <LinkContainer href={pageHref} size="m_menu_page" onClick={() => handleMainMenu(false)}>
        <span className="ml-4 text-[1rem] weight-500 leading-[0.8] text-viva-gray-2">{pageName}</span>
        </LinkContainer>
      </div>
    </>
  )
}
