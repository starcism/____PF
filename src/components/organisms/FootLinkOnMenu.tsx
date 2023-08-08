'use client'

import checkEnvironment from '@/libs/checkEnvironment'
import Divider from '../atoms/Divider'
import ConditionalLink from '../molecules/ConditionalLink'
import { useAccessTokenState } from '@/libs/AccessTokenProvider'

export default function FootLinkOnMenu({ session = null, loading = false }: { session?: string | null; loading?: boolean }) {
  const { setAccessToken } = useAccessTokenState()
  const getLogOut = async (session: string | null) => {
    if (session) {
      try {
        const res = await fetch(checkEnvironment().concat('/api/auth/logout'), {
          method: 'POST',
          headers: {
            Authorization: session,
          },
        })
        setAccessToken(null)
      } catch (error) {
        return
      }
    } else {
      return
    }
  }

  if (loading) {
    return (
      <>
        <div className="h-[3.5rem] bg-white flex items-center">
          <div className="flex w-full h-full">
            <div className="flex w-full justify-center items-center">
              <span className="text-[1.1rem] weight-400 text-gray-5 selec-none">회원가입</span>
            </div>
          </div>
        </div>
        <Divider size="m_transparent" my="4px" />
        <div className="flex w-full h-[4rem] justify-center items-center pointer-events-none select-none">
          <span className="text-gray-2 text-[1.1rem] weight-400">후원하기</span>
        </div>
      </>
    )
  }

  return (
    <>
      <ConditionalLink hrefLoggedIn="/" hrefLoggedOut="/auth" size="m_menu_footer" session={session} onClickLoggedIn={() => getLogOut(session)}>
        {(session) => (
          <div className="flex w-full h-full">
            {session ? (
              <div className="flex w-full justify-center items-center">
                <span className="text-[1.1rem] text-gray-5 weight-400">로그아웃</span>
              </div>
            ) : (
              <div className="flex w-full justify-center items-center">
                <span className="text-[1.1rem] weight-400 text-gray-5">회원가입</span>
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
