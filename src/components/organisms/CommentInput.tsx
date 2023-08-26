'use client'

import { useState } from 'react'
import UserComment from '../molecules/UserComment'

interface Props {
  accessToken: string | null
  loggedIn: boolean
}

export default function CommentInput({ accessToken, loggedIn }: Props) {
  const [textareaValue, setTextareaValue] = useState<string>('')

  return (
    <>
      <div className='px-[13px]'>
        <form>
          <UserComment value={textareaValue} setValue={setTextareaValue} />
        </form>
      </div>
    </>
  )
}
