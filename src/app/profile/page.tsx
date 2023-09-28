'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import ProfileLayout from '@/components/templates/ProfileLayout'
import { useUserState } from '@/libs/UserProvider'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const { accessToken, nickname, setNickname, profileImage, setProfileImage, createdAt, userId, isLoading, error } = useUserState()
  const router = useRouter()

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  } else if (!accessToken || !nickname || error || !userId || !createdAt) {
    router.push('/auth')
  } else {
    return (
      <>
        <ProfileLayout
          accessToken={accessToken}
          userId={userId}
          nickname={nickname}
          setNickname={setNickname}
          createdAt={createdAt}
          profile_image={profileImage}
          setProfileImage={setProfileImage}
        />
      </>
    )
  }
}
