'use client'

export default function BoardNotice() {
  return (
    <>
      <div className="flex items-center w-full h-[36px] bg-white py-[8px] mb-1 pl-[7px] mt-[6px] select-none">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 mt-[2px] w-[16px] h-[16px] text-white bg-turquoise rounded-full">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <h1 className="ml-[8px] text-[14px] weight-500 text-turquoise">커뮤니티 가이드</h1>
      </div>
      {/* <Divider size="m_m" /> */}
      {/* <div className="w-full h-[20px] bg-gray-1"></div>
      <Divider size="m_m" /> */}
    </>
  )
}