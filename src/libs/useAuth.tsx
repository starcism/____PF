'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAccessTokenState } from './AccessTokenProvider'
import checkEnvironment from './checkEnvironment'

process.env

export default function useAuth() {
  const { accessToken, setAccessToken, loading } = useAccessTokenState()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const fetchData = useCallback(async () => {
    try {
      //액세스 토큰 먼저 검증
      const verifyingRes = await fetch(checkEnvironment().concat('/api/auth/verification/authv1'), {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
      })

      if (verifyingRes.ok) {
        return

        //토큰 만료시 재발급 요청
      } else if (verifyingRes.status === 401) {
        const tokenRefreshRes = await fetch(checkEnvironment().concat('/api/auth/verification/authv4'), {
          method: 'POST',
          credentials: 'include',
        })

        //리프레시 토큰 검증 성공 및 재발급 성공
        if (tokenRefreshRes.ok) {
          const newAccessToken = tokenRefreshRes.headers.get('Authorization')
          setAccessToken(newAccessToken)

          //검증 및 재발급 실패
        } else {
          setAccessToken(null)
          setError(true)
        }

        //토큰 위변조
      } else if (verifyingRes.status === 403) {
        setAccessToken(null)
        setError(true)
      }
    } catch (err) {
      setAccessToken(null)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }, [accessToken, setAccessToken])

  useEffect(() => {
    if (!loading && accessToken) {
      fetchData()
    } else if (!loading && !accessToken) {
      setIsLoading(false)
      setError(true)
    }
  }, [loading, fetchData])

  return { isLoading, error }
}
