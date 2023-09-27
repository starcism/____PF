'use client'

import useObserver from '@/libs/useObserver'
import { SetStateAction, useEffect } from 'react'
import LoadingSpinner, { SmallLoadingSpinner } from '../atoms/LoadingSpinner'
import checkEnvironment from '@/libs/checkEnvironment'

interface Props {
  prev: any[] | null
  next: number
  setNextData: React.Dispatch<SetStateAction<any[] | null>>
  boardType: string
  userId?: number | null
  totalPages: number
}

const dummy = [
  {
    board_id: 3,
    title: '하하',
    view: 0,
    liked: 0,
    comment_count: 0,
    created_at: '2023-09-26T11:47:01.321Z',
    updated_at: '2023-09-26T11:47:01.321Z',
    deleted_at: null,
    nickname: '관리자',
  },
  {
    board_id: 2,
    title: '호호',
    view: 0,
    liked: 0,
    comment_count: 0,
    created_at: '2023-09-26T11:46:01.321Z',
    updated_at: '2023-09-26T11:46:01.321Z',
    deleted_at: null,
    nickname: '관리자',
  },
  {
    board_id: 1,
    title: '히히',
    view: 0,
    liked: 0,
    comment_count: 0,
    created_at: '2023-09-26T11:45:01.321Z',
    updated_at: '2023-09-26T11:45:01.321Z',
    deleted_at: null,
    nickname: '관리자',
  },
]

const getPost = async (boardType: string, url: string) => {
  try {
    const res = await fetch(checkEnvironment().concat(url), {
      method: 'GET',
      cache: 'no-store',
    })
    if (res.status === 200) {
      const { posts, totalPages, isLastPage, next } = await res.json()
      return { posts, totalPages, isLastPage, next }
    } else {
      throw new Error()
    }
  } catch (error) {
    throw new Error()
  }
}

export default function Observer({ prev, next, setNextData, totalPages, boardType, userId = null }: Props) {
  const { target, postData, promise, setPromise, isLastPage } = useObserver(prev, getPost, totalPages, next, boardType, userId)

  useEffect(() => {
    if (promise === 'fulfilled') {
      setNextData(postData)
      setPromise(null)
    } else if (promise === 'rejected') {
      setPromise(null)
    }
  }, [promise])

  if (isLastPage) {
    return <div className="w-full h-[120px] text-gray-2 flex justify-center items-center select-none">마지막 페이지에요</div>
  }

  if (next === 0) {
    return <></>
  }

  return (
    <>
      <div ref={target} className="w-full h-[80px]">
        {promise === 'pending' && !isLastPage && <LoadingSpinner isObserver={true} />}
      </div>
    </>
  )
}
