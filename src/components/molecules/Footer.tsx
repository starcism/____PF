'use client'

import LinkContainer from '../atoms/LinkContainer'

export default function Footer() {
  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-between items-center w-full h-[8rem] px-[2rem] pt-[10rem]">
          <div className="w-1/3 flex justify-center">
            <LinkContainer href="/" size="m_menu_footer_small">
              <span className="text-[0.9rem] weight-350 text-viva-gray-1">이용약관</span>
            </LinkContainer>
          </div>
          <div className="w-1/3 flex justify-center">
            <LinkContainer href="/" size="m_menu_footer_small">
              <span className="text-[0.9rem] weight-350 text-viva-gray-1">개인정보처리방침</span>
            </LinkContainer>
          </div>
          <div className="w-1/3 flex justify-center">
            <LinkContainer href="/" size="m_menu_footer_small">
              <span className="text-[0.9rem] weight-350 text-viva-gray-1">문의</span>
            </LinkContainer>
          </div>
        </div>
      </div>
    </>
  )
}
