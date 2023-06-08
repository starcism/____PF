'use client'

import { MainMenuContext } from '@/libs/ContextProvider'
import { Session } from 'next-auth'
import { useContext } from 'react'
import UserIcon from '../atoms/UserIcon'
import ConditionalLink from '../molecules/ConditionalLink'

export default function ProfileLinkOnMenu({ session }: { session: Session | null }) {
  const { handleMainMenu } = useContext(MainMenuContext)
  return (
    <>
      <ConditionalLink hrefLoggedIn="/profile" hrefLoggedOut="/auth" size="m_menu_profile" session={session} onClickLoggedIn={() => handleMainMenu(false)}>
        {(session) => (
          <div className="flex w-full h-full">
            {session ? (
              <div className="flex w-full justify-between mx-[1rem]">
                <div className="flex items-center">
                  <UserIcon />
                  <span className="pt-[0.1rem] ml-4 text-[1rem] weight-600 leading-[0.8]">SWITHy</span>
                </div>
                <div className="flex items-center">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-between mx-[1rem]">
                <div className="flex items-center">
                  <span className="ml-8 pt-[0.1rem] text-[1rem] weight-600 leading-[0.8]">로그인 후 이용하세요</span>
                </div>
                <div className="flex items-center">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </ConditionalLink>
    </>
  )
}
