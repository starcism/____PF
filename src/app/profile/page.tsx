'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import ProfileLayout from '@/components/templates/ProfileLayout'
import { useUserState } from '@/libs/UserProvider'
import useUserId from '@/libs/useUserId'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const { accessToken, nickname, setNickname, userId, isLoading, error } = useUserState()
  const router = useRouter()
  console.log(accessToken, userId, isLoading, error)
  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  } else if (!accessToken) {
    router.push('/auth')
  }

  return (
    <>
      <ProfileLayout accessToken={accessToken} nickname="꾸미맘" profile_image="/images/liz1.jpeg" />
    </>
  )
}
