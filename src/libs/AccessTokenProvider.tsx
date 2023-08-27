'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import checkEnvironment from './checkEnvironment'

interface Props {
  children: React.ReactNode
}

interface AccessTokenContextProps {
  accessToken: null | string
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
  loading: boolean
}

// 액세스 토큰 관리
const AccessTokenContext = createContext<AccessTokenContextProps>({
  accessToken: null,
  setAccessToken: (): void => {},
  loading: false,
})

export function useAccessTokenState() {
  return useContext(AccessTokenContext)
}

export default function AccessTokenProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(checkEnvironment().concat('/api/auth/verification/authv4'), {
        method: 'POST',
        credentials: 'include',
        next: {
          revalidate: 3600 * 23,
        },
      })

      if (res.status === 500 || res.status === 401) {
        setAccessToken(null)
      } else {
        const newAccessToken = res.headers.get('Authorization')
        setAccessToken(newAccessToken)
      }
    } catch (error) {
      setAccessToken(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (accessToken) {
      setLoading(false)
      return
    }
    fetchData()
  }, [])

  return <AccessTokenContext.Provider value={{ accessToken, setAccessToken, loading }}>{children}</AccessTokenContext.Provider>
}
