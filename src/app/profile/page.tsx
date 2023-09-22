'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import ProfileLayout from '@/components/templates/ProfileLayout'
import { useUserState } from '@/libs/UserProvider'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const { accessToken, nickname, setNickname, userId, isLoading, error } = useUserState()
  const router = useRouter()

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  } else if (!accessToken || !nickname || error) {
    router.push('/auth')
  } else {
    return (
      <>
        <ProfileLayout accessToken={accessToken} nickname={nickname} setNickname={setNickname} profile_image="/images/liz1.jpeg" />
      </>
    )
  }
}
