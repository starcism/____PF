'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import checkEnvironment from '@/libs/checkEnvironment'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
  const router = useRouter()
  useEffect(() => {
    const tokenRequest = async () => {
      try {
        const response = await axios.post(checkEnvironment().concat('/api/auth/login'), {
          code: searchParams.code,
        })
        if (response.status === 200) {
          window.opener ? (window.opener.location.href = checkEnvironment().concat('/')) : router.replace('/')
          window.close()
        } else {
          window.opener ? (window.opener.location.href = checkEnvironment().concat('/auth')) : router.replace('/')
          window.close()
        }
      } catch (error) {
        window.opener ? (window.opener.location.href = checkEnvironment().concat('/auth')) : router.replace('/')
        window.close()
      }
    }

    if (searchParams.code) {
      tokenRequest()
    } else if (searchParams.error) {
      window.opener ? (window.opener.location.href = checkEnvironment().concat('/auth')) : router.replace('/')
      window.close()
    } else {
      router.replace('/')
    }
  }, [])

  return
}
