'use client'

import { useContext } from 'react'
import LinkContainer from '../atoms/LinkContainer'
import { MainMenuContext } from '@/libs/MainMenuProvider'

export default function Footer() {
  const { handleMainMenu } = useContext(MainMenuContext)

  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-between items-center w-full h-[8rem] px-[2rem] pt-[10rem]">
          <div className="w-1/3 flex justify-center">
            <LinkContainer onClick={() => handleMainMenu(false)} href="/policy" size="m_menu_footer_small">
              <span className="text-[0.9rem] weight-400 text-viva-gray-1">이용약관</span>
            </LinkContainer>
          </div>
          <div className="w-1/3 flex justify-center">
            <LinkContainer onClick={() => handleMainMenu(false)} href="/privacy" size="m_menu_footer_small">
              <span className="text-[0.9rem] weight-400 text-viva-gray-1">개인정보처리방침</span>
            </LinkContainer>
          </div>
          <div className="w-1/3 flex justify-center">
            <LinkContainer onClick={() => handleMainMenu(false)} href="/" size="m_menu_footer_small">
              <span className="text-[0.9rem] weight-400 text-viva-gray-1">문의</span>
            </LinkContainer>
          </div>
        </div>
      </div>
    </>
  )
}
