'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import PhotoBoardWritingForm from '@/components/templates/PhotoBoardWritingForm'
import UnauthorizedPage from '@/components/templates/UnauthorizedPage'
import useAuth from '@/libs/useAuth'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const { isLoading, error } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  } else if (error) {
    router.push('/auth')
  }
  return (
    <>
      <PhotoBoardWritingForm />
    </>
  )
}
