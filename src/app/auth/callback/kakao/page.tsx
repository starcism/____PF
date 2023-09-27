'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import checkEnvironment from '@/libs/checkEnvironment'

export default function Page() {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')
  const error = params.get('error')

  useEffect(() => {
    const tokenRequest = async () => {
      try {
        const response = await axios.post(checkEnvironment().concat('/api/auth/login'), {
          code: code,
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

    if (code) {
      tokenRequest()
    } else if (error) {
      window.opener ? (window.opener.location.href = checkEnvironment().concat('/auth')) : router.replace('/')
      window.close()
    } else {
      router.replace('/')
    }
    
  }, [])

  return
}
