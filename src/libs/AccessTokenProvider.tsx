'use client'

import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react'
import checkEnvironment from './checkEnvironment'

interface Props {
  children: React.ReactNode
}

interface AccessTokenContextProps {
  accessToken: null | string
  setAccessToken: React.Dispatch<React.SetStateAction<null | string>>
}

//액세스 토큰 관리
const AccessTokenContext = createContext<AccessTokenContextProps>({ accessToken: null, setAccessToken: (): void => {} })

export function useAccessTokenState() {
  return useContext(AccessTokenContext)
}

export default function AccessTokenProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useLayoutEffect(() => {
    const fetchData = async () => {
      const res = await fetch(checkEnvironment().concat('/api/auth/verification/authv4'), {
        method: 'POST',
        credentials: 'include',
        next: {
          revalidate: 3600 * 6 - 1800,
        },
      })
      if (res.status === 500 || res.status === 401) {
        return setAccessToken(null)
      }
      const newAccessToken = res.headers.get('Authorization')
      return setAccessToken(newAccessToken)
    }

    fetchData()
  }, [accessToken])
  const memoizedValue = useMemo(() => ({ accessToken, setAccessToken }), [accessToken])

  return <AccessTokenContext.Provider value={memoizedValue}>{children}</AccessTokenContext.Provider>
}

// import { AccessTokenProvider } from './ContextProvider';
// import { createRefreshToken } from './verifyToken';

// interface Props {
//   children: React.ReactNode;
// }

// let cachedAccessToken: string | null = null; // 캐시된 액세스 토큰을 저장할 변수

// async function getAccessToken() {
//   const res = await fetch('http://localhost:3000/api/auth', {
//     method: 'POST',
//     credentials: 'include',
//     next: {
//       revalidate: (3600 * 6) - 1800
//     },

//   })

//   const data = await res.json()
//   cachedAccessToken = data // 새로운 액세스 토큰 값을 캐시에 저장
//   return data
// }

// export default async function AuthProvider({ children }: Props) {
//   const initialAccessToken = await getAccessToken()
//   console.log('iat:', initialAccessToken)

//   return (
//     <>
//       <AccessTokenProvider initialAccessToken={initialAccessToken}>{children}</AccessTokenProvider>
//     </>
//   );
// }
