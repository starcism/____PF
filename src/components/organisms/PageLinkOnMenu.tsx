'use client'

import Divider from '../atoms/Divider'
import Label from '../atoms/Label'
import LinkWithCloseMenu from '../molecules/LinkWithCloseMenu'

export default function PageLinkOnMenu() {
  return (
    <>
      <Divider size="m_lg" />
      <div>
        <Label size="m_menu_pagelink" text1='LOVED' text2='IVE'/>
        <LinkWithCloseMenu pageHref="/notice" pageName="공지사항" />
        <Divider size="m_sm" my="4px" />
        <LinkWithCloseMenu pageHref="/free" pageName="포럼" />
      </div>
      <Divider size="m_m" my="4px" />
      <div>
      <Label size="m_menu_pagelink" text1='ARCH' text2='IVE'/>
        <LinkWithCloseMenu pageHref="/photo" pageName="갤러리" />
        <Divider size="m_sm" my="4px" />
        <LinkWithCloseMenu pageHref="/video" pageName="영상" />
      </div>
      <Divider size="m_lg" my="4px" />
    </>
  )
}
