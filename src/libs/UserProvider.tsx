'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import checkEnvironment from './checkEnvironment'
import { useAccessTokenState } from './AccessTokenProvider'

interface Props {
  children: React.ReactNode
}

interface UserContextProps {
  accessToken: string | null
  userId: number | null
  nickname: string | null
  setNickname: React.Dispatch<React.SetStateAction<string | null>>
  isLoading: boolean
  error: boolean
}

// 유저아이디랑, 닉네임, 프로필 사진 정보

const UserContext = createContext<UserContextProps>({
  accessToken: null,
  userId: null,
  nickname: null,
  setNickname: (): void => {},
  isLoading: true,
  error: false,
})

export function useUserState() {
  return useContext(UserContext)
}

export default function UserProvider({ children }: Props) {
  const { accessToken, setAccessToken, loading } = useAccessTokenState()
  const [userId, setUserId] = useState<number | null>(null)
  const [nickname, setNickname] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      //액세스 검증
      const verifyingRes = await fetch(checkEnvironment().concat('/api/auth/verification/authv2'), {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
      })

      if (verifyingRes.ok) {
        const { data } = await verifyingRes.json()
        setUserId(data.userId)
        setNickname(data.nickname)
      } else {
        setError(true)
      }
    } catch (err) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!loading && accessToken) {
      fetchData()
    } else if (!loading && !accessToken) {
      setIsLoading(false)
      setError(true)
    }
  }, [loading, fetchData])

  return <UserContext.Provider value={{ accessToken, userId, nickname, setNickname, isLoading, error }}>{children}</UserContext.Provider>
}
