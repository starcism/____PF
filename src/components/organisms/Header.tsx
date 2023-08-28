'use client'

import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import SearchModal from '../templates/SearchModal'
import MainMenu from '../templates/MainMenu'
import { MainMenuContext } from '@/libs/MainMenuProvider'
import { useParams, usePathname } from 'next/navigation'
import Image from 'next/image'
import swithy_logo from '@/utils/SWITHy_logo.png'
import getPathname from '@/libs/getPathname'

interface Props {
  pathname: string | null
}
type TBoardTypeObj = {
  [key: string]: string
}

function HeaderComponent({ pathname }: Props) {
  const { mainMenu, handleMainMenu } = useContext(MainMenuContext)
  const [isSearchBarOpen, setSearchBarOpen] = useState(false)
  const handleSearchBarOpen = (e: boolean) => {
    setSearchBarOpen(e)
    handleMainMenu(false)
  }

  return (
    <>
      {isSearchBarOpen && <SearchModal pathname={pathname} show={isSearchBarOpen} close={handleSearchBarOpen} />}
      {mainMenu && <MainMenu />}
      <div className="z-1000 w-full h-[52px] flex items-center justify-center px-[0.5rem] bg-lightgold shadow-sm">
        <div className="flex w-full">
          <div className="flex h-[40px] w-[40px] items-center justify-center">
            <div className="text-[#373737] w-[40px] h-[40px] rounded-[50%] hover:bg-hover-button duration-200">
              <button onClick={() => handleMainMenu(!mainMenu)} className="flex items-center justify-center w-full h-full rounded-[50%]">
                {mainMenu ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex w-full h-[40px] items-center justify-center">
            <Link href="/" className="flex items-center justify-center h-[40px] w-[100px]" onClick={() => handleMainMenu(false)}>
              <span className="font-sans text-[16px] font-700">LOVEDIVE</span>
              {/* <Image alt="logo" src={swithy_logo} width={80} priority={true} /> */}
            </Link>
          </div>
          <div className="flex h-[40px] w-[40px] items-center justify-center">
            <div className="text-[#373737] w-[40px] h-[40px] rounded-[50%] hover:bg-hover-button duration-200">
              <button className="flex items-center justify-center w-full h-full rounded-[50%]" onClick={() => setSearchBarOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function SubHeader({ pathname }: Props) {
  const boardTypeObj: TBoardTypeObj = {
    '/notice': '공지사항',
    '/forum': '포럼',
    '/photo': '갤러리',
    '/video': '영상',
  }

  const boardType = pathname ? boardTypeObj[pathname] : '전체글'
  return (
    <>
      <div className="flex w-full relative bg-white justify-between items-center h-[44px] px-[0.5rem] border-b border-solid border-[#dddddd]">
        <div className="flex h-[30px] w-[75px] ml-[0.5rem] justify-start items-center pointer-events-none select-none">
          <span className="text-[14px] text-viva-gray-1 align-top whitespace-nowrap overflow-hidden overflow-ellipsis leading-[45px] font-bold">
            {boardType}
          </span>
        </div>
        {pathname !== '/notice' && (
          <div className="flex items-center">
            <div className="h-[30px] w-[40px] mr-[0.5rem] border-[0.5px] border-solid border-[#dddddd] rounded-[15px] hover:bg-hover-button duration-200">
              <button className="flex justify-center items-center w-full h-full">
                <svg
                  className="w-6 h-6 text-viva-gray-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>
            <div className="h-[30px] w-[45px] mr-[0.5rem] border-[0.5px] border-solid border-[#dddddd] rounded-[17px] hover:bg-hover-button duration-200">
              <Link href={`${pathname}/write`} className="flex justify-center items-center w-full h-full">
                {pathname && (
                  <svg
                    className="w-6 h-6 text-viva-gray-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 26 26"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function Header() {
  const pathname = usePathname()
  const params = useParams()
  const paths = getPathname(pathname)
  const props = '/' + paths[0]

  const hideHeaderUrls = ['auth']
  const showSubHeaderUrls = ['/forum', '/notice', '/photo', '/video']

  const showHeader = !paths.some((path) => path === 'write') && !hideHeaderUrls.some((path) => path === paths[0]) && !paths[1]
  const showSubHeader = showSubHeaderUrls.some((path) => path === pathname)

  return (
    <>
      <div className="top-0 fixed z-10 w-full">
        {pathname && showHeader && <HeaderComponent pathname={props} />}
        {pathname && showSubHeader && <SubHeader pathname={props} />}
      </div>
      {pathname && showHeader && <div className="h-[50px] w-full bg-white" />}
      {pathname && showSubHeader && <div className="h-[42px] w-full bg-white" />}
    </>
  )
}
