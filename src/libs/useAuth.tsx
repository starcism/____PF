'use client'

import { useEffect, useState } from 'react'
import { useAccessTokenState } from './AccessTokenProvider'
import checkEnvironment from './checkEnvironment'

export default function useAuth() {
  const { accessToken, setAccessToken } = useAccessTokenState()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(true)
  const fetchData = async () => {
    try {
      //액세스 토큰 먼저 검증
      const verifyingRes = await fetch(checkEnvironment().concat('/api/auth/verification/authv1'), {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      //토큰 만료시 재발급 요청
      if (verifyingRes.status === 200) {
        setError(false)
      } else if (verifyingRes.status === 401) {
        const tokenRefreshRes = await fetch(checkEnvironment().concat('/api/auth/verification/authv4'), {
          method: 'POST',
          credentials: 'include',
        })

        if (tokenRefreshRes.status === 200) {
          const newAccessToken = tokenRefreshRes.headers.get('Authorization')
          setAccessToken(newAccessToken)
          setError(false)
        } else if (tokenRefreshRes.status === 500 || tokenRefreshRes.status === 401) {
          setAccessToken(null)
        }
      }
    } catch (err) {
      setAccessToken(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (accessToken) {
      setLoading(true)
      fetchData()
    } else {
      return
    }
  }, [])

  return { loading, error }
}
