import Divider from '@/components/atoms/Divider'

export default function Page() {
  return (
    <>
      <div className="p-[20px] leading-[22px]">
        <h1 className="py-[10px] text-[16px]">개인정보처리방침</h1>
        <Divider size="m_lg" />
        <div className="text-[14px] text-gray-5 p-[10px]">
          <h2 className="font-700">개인정보의 처리 목적</h2>
          <p>- 회원 가입 및 회원 관리를 위한 본인 확인, 부정 이용 방지</p>
        </div>
        <div className="text-[14px] text-gray-5 p-[10px]">
          <h2 className="font-700">처리하는 개인정보의 항목</h2>
          <p>-</p>
        </div>
        <div className="text-[14px] text-gray-5 p-[10px]">
          <h2 className="font-700">개인정보의 처리 및 보유기간</h2>
          <p>
            - 이용자가 회원에서 탈퇴하거나 개인정보의 수집 및 이용목적이 달성되었을 때 지체없이 파기합니다. 단, 관련 법령의 규정에 의하여 보존할 필요가 있는
            경우에는 일정기간 동안 회원정보를 안전하게 보관합니다.
          </p>
        </div>
        {/* <div className="text-[14px] text-gray-5 p-[10px]">
          <h2 className="font-700">개인정보의 파기 절차 및 파기 방법</h2>
          <p>- 회원 가입시 수집한 정보는 </p>
        </div> */}
      </div>
    </>
  )
}
