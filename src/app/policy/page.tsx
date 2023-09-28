import Divider from '@/components/atoms/Divider'

export default function Page() {
  return (
    <>
      <div className="p-[20px] leading-[22px]">
        <h1 className="py-[10px] text-[16px]">이용약관</h1>
        <Divider size="m_lg" />
        <div className="text-[14px] text-gray-5 p-[10px]">
          <h2>제1조 [목적]</h2>
          <p>본 약관은 lovedive.net(이하 사이트)와 서비스 이용자간의 관련 규정을 정하는 것을 목적으로 합니다.</p>
        </div>
      </div>
    </>
  )
}
