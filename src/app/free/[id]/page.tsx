'use client'

import Modal from '@/components/organisms/Modal'
import BoardLayout from '@/components/templates/BoardLayout'
import FreeBoard from '@/components/templates/FreeBoard'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type TProps = {
  params: {
    id: number | string
  }
}

interface Props {
  user: {
    userId: number
    profileImage?: string
    nickname: string
  }

  title: string
  content: string
  commentCount: number
  liked: number
  view: number
  createdAt: string
}

export default function Page(prop: TProps) {
  const router = useRouter()
  const props = {
    user: {
      userId: 0,
      profileImage: '',
      nickname: '유저',
    },
    title: '첫 글을 썼어요',
    content: '안녕하세요\n반가워요\n저에요\n저',
    commentCount: 0,
    liked: false,
    likeCount: 0,
    view: 0,
    createdAt: '2023-08-03T15:43:18.576Z',
  }

  return (
    <>
      <BoardLayout boardType="포럼" onClick={() => router.back()}>
        <FreeBoard
          user={props.user}
          title={props.title}
          content={props.content}
          commentCount={props.commentCount}
          liked={props.liked}
          likeCount={props.likeCount}
          view={props.view}
          createdAt={props.createdAt}
        />
      </BoardLayout>
    </>
  )
}
