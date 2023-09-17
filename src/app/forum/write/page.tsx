'use client'

import React from 'react'
import FreeBoardWritingForm from '@/components/templates/FreeBoardWritingForm'
import useAuth from '@/libs/useAuth'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'

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
  } else {
    return (
      <>
        <FreeBoardWritingForm />
      </>
    )
  }
}
