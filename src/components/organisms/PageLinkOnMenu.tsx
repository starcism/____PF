'use client'

import Divider from '../atoms/Divider'
import Label from '../atoms/Label'
import LinkWithCloseMenu from '../molecules/LinkWithCloseMenu'

export default function PageLinkOnMenu() {
  return (
    <>
      <Divider size="m_lg" />
      <div>
        <Label size="m_menu_pagelink">일반</Label>
        <LinkWithCloseMenu pageHref="/notice" pageName="공지사항" />
        <Divider size="m_sm" my="4px" />
        <LinkWithCloseMenu pageHref="/free" pageName="자유게시판" />
      </div>
      <Divider size="m_m" my="4px" />
      <div>
        <Label size="m_menu_pagelink">영상관</Label>
        <LinkWithCloseMenu pageHref="/photo" pageName="사진게시판" />
        <Divider size="m_sm" my="4px" />
        <LinkWithCloseMenu pageHref="/video" pageName="영상게시판" />
      </div>
      <Divider size="m_lg" my="4px" />
    </>
  )
}
