'use client'

import React from 'react'
import FreeBoardWritingForm from '@/components/templates/FreeBoardWritingForm'

interface IFormData {
  title: string
  content: string
}

export default function Page() {
  const onSubmit = async (title: string, content: string) => {
    try {
      const formData: IFormData = { title, content }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data) // 성공적으로 저장된 데이터 확인
        // 여기서 필요한 추가 작업을 수행하세요 (예: 리다이렉션)
      } else {
        console.error('API 호출이 실패했습니다.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <FreeBoardWritingForm onSubmit={onSubmit} />
    </>
  )
}
