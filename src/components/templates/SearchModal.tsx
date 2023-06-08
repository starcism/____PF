'use Client'

import React from 'react'

interface IProps {
  show: boolean
  close: (e: boolean) => void
  pathname: string | null
}
type TBoardTypeObj = {
  [key: string]: string
}

const SearchModal = ({ show, close, pathname }: IProps) => {
  const boardTypeObj: TBoardTypeObj = {
    '/': '전체글',
    '/profile': '전체글',
    '/notice': '공지글',
    '/free': '자유게시판',
    '/photo': '사진게시판',
    '/video': '영상게시판',
  }
  const boardType = pathname ? boardTypeObj[pathname] : '전체글'

  // const [boardType, setBoardType] = useState(pathname ? pathname : '/')

  // const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedBoardType = event.target.value
  //   setBoardType(selectedBoardType)
  // }

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // Handle input change logic here
  // }

  return (
    <>
      {show && (
        <div
          className="fixed left-0 top-0 w-screen h-screen bg-white custom-border-t-1 z-[1010]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex w-full items-center h-[52px] bg-viva-7">
            <div className="flex w-full h-[52px] items-center px-[0.5rem]">
              <form className="flex w-full items-center pr-[0.2rem]">
                <input
                  className="w-full h-[39px] ml-[16px] bg-gray-50 border-none outline-none rounded-[0.375rem] text-[1rem] py-[0.6rem] px-[0.8rem]"
                  placeholder={`${boardType} 검색`}
                  // onChange={handleInputChange}
                />
              </form>
              <div className="flex shrink-0 items-center justify-center w-[40px] h-[40px]">
                <button onClick={() => close(!show)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchModal
