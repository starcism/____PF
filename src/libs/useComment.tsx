'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAccessTokenState } from './AccessTokenProvider'
import checkEnvironment from './checkEnvironment'
import { Comments } from '@/types/types'

export default function useComment(boardId: string) {
  const { accessToken, setAccessToken, loading } = useAccessTokenState()
  const [userInfoLoading, setUserInfoLoading] = useState<boolean>(true)
  const [commentAreaLoading, setCommentAreaLoading] = useState<boolean>(true)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [like, setLike] = useState<boolean>(false)
  const [commentList, setCommentList] = useState<Comments[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)
  const [UID, setUID] = useState<number | null>(null)

  const refreshComments = async () => {
    if (!loading) {
      setRefresh(true)
      await getCommentArea(boardId, true)
    }
  }

  const getCommentArea = useCallback(
    async (boardId: string, refresh?: boolean) => {
      try {
        const res = await fetch(checkEnvironment().concat(`/api/board/forum/info?boardId=${boardId}`), {
          method: 'POST',
          cache: 'no-store',
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        if (refresh && res.status === 200) {
          const { comments } = await res.json()
          setCommentList(comments)
          return
        }
        if (res.status === 200) {
          const { userLike, comments } = await res.json()
          setLike(userLike)
          setCommentList(comments)
        } else {
          return
        }
      } catch (error) {
        return
      } finally {
        setCommentAreaLoading(false)
        setRefresh(false)
      }
    },
    [accessToken],
  )

  const fetchData = useCallback(async () => {
    try {
      //액세스 토큰 먼저 검증
      const verifyingRes = await fetch(checkEnvironment().concat('/api/auth/verification/authv2'), {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
      })

      if (verifyingRes.ok) {
        const { data } = await verifyingRes.json()
        setUID(data.userId)
        setLoggedIn(true)
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
          setLoggedIn(true)

          //검증 및 재발급 실패
        } else {
          setAccessToken(null)
        }

        //토큰 위변조
      } else if (verifyingRes.status === 403) {
        setAccessToken(null)
      }
    } catch (err) {
      setAccessToken(null)
    } finally {
      setUserInfoLoading(false)
    }
  }, [accessToken, setAccessToken])

  useEffect(() => {
    if (!loading && accessToken) {
      fetchData()
    } else if (!loading && !accessToken) {
      setUserInfoLoading(false)
    }
  }, [loading, fetchData])

  useEffect(() => {
    if (!loading) {
      getCommentArea(boardId)
    }
  }, [loading])

  return { userInfoLoading, commentAreaLoading, loggedIn, like, commentList, accessToken, refresh, refreshComments, UID }
}
