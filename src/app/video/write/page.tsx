'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import UnauthorizedPage from '@/components/templates/UnauthorizedPage'
import VideoBoardWritingForm from '@/components/templates/VideoBoardWritingForm'
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
    return (
      <>
        <UnauthorizedPage />
      </>
    )
  }
  return (
    <>
      <VideoBoardWritingForm />
    </>
  )
}
