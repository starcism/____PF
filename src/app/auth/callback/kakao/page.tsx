'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import checkEnvironment from '@/libs/checkEnvironment'

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')

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
    }
    console.log('searchParams:', searchParams, 'code:', code)
  }, [searchParams])

  return <>{searchParams.code}</>
}
