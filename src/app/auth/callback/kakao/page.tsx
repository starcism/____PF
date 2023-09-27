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
          router.replace('/notice/0')
        } else {
          router.replace('/notice/1')
        }
      } catch (error) {
        router.replace('/notice/2')
      }
    }

    if (searchParams.code) {
      tokenRequest()
    } else if (searchParams.error) {
      router.replace('/notice/3')
    } else {
      router.replace('/notice/4')
    }
  }, [])

  return
}
