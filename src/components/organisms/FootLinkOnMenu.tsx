'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Divider from '../atoms/Divider'
import ConditionalLink from '../molecules/ConditionalLink'

export default function FootLinkOnMenu({ session }: { session: Session | null }) {
  return (
    <>
      <ConditionalLink hrefLoggedIn="" hrefLoggedOut="/auth" size="m_menu_footer" session={session} onClickLoggedIn={() => signOut()}>
        {(session) => (
          <div className="flex w-full h-full">
            {session ? (
              <div className="flex w-full justify-center items-center">
                <span className="text-[1.1rem] weight-400">로그아웃</span>
              </div>
            ) : (
              <div className="flex w-full justify-center items-center">
                <span className="text-[1.1rem] weight-400 text-viva-gray-2">회원가입</span>
              </div>
            )}
          </div>
        )}
      </ConditionalLink>
      <Divider size="m_transparent" my="4px" />
      <div className="flex w-full h-[4rem] justify-center items-center pointer-events-none select-none">
        <span className="text-gray-2 text-[1.1rem] weight-400">후원하기</span>
      </div>

      {/* <ConditionalLink hrefLoggedIn="" hrefLoggedOut="" size="m_menu_footer" session={session} >
        {(session) => (
          <div className="flex w-full h-full`}>
            {session ? (
              <div className="flex w-full justify-center items-center`}>
                <span className="text-gray-2 [font-size: 1.1rem] [font-weight: 400]`}>후원하기</span>
              </div>
            ) : (
              <div className="flex w-full justify-center items-center`}>
                <span className="[font-size: 1.1rem] [font-weight: 400]`}>후원하기</span>
              </div>
            )}
          </div>
        )}
      </ConditionalLink> */}
    </>
  )
}
