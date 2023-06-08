'use client'

import Divider from '../atoms/Divider'

export default function NoticeBoardHeader() {
  return (
    <>
      <Divider size="m_lg" />
      <div className="flex items-center w-full h-[48px] bg-white py-[8px] px-[7px]">
        <div className="flex items-center justify-center custom-border-1 ml-[4px] mr-[11px] rounded-[11px] w-[36px] h-[24px]">
          <span className="text-[12px]">공지</span>
        </div>
        <h1>제목1</h1>
      </div>
      <Divider size="m_sm" />
      <div className="flex items-center w-full h-[48px] bg-white py-[8px] px-[7px]">
        <div className="flex items-center justify-center custom-border-1 ml-[4px] mr-[11px] rounded-[11px] w-[36px] h-[24px]">
          <span className="text-[12px]">공지</span>
        </div>
        <h1>제목2</h1>
      </div>
      <Divider size="m_m" />
      <div className="w-full h-[48px] bg-gray-1"></div>
      <Divider size="m_m" />
    </>
  )
}
