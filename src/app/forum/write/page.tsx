'use client'

import React, { useEffect } from 'react'
import FreeBoardWritingForm from '@/components/templates/FreeBoardWritingForm'
import useAuth from '@/libs/useAuth'
import { useRouter } from 'next/navigation'
import UnauthorizedPage from '@/components/templates/UnauthorizedPage'
import LoadingSpinner from '@/components/templates/LoadingSpinner'

export default function Page() {
  const { loading, error } = useAuth()
  const router = useRouter()

  if (loading) {
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
      <FreeBoardWritingForm />
    </>
  )
}
