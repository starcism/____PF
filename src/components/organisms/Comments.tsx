'use client'

import { Comments } from '@/types/types'
import Comment from '../molecules/Comment'

interface Props {
  commentList: Comments[]
}

export default function Comments({ commentList }: Props) {
  return (
    <>
      <div className='px-[13px]'>
        <div className="flex items-center w-full h-[30px] mt-[11px] mb-[21px]">
          <h1 className="flex items-center text-[16px] text-gray-6">{`댓글 ${commentList.length}개`}</h1>
        </div>
        {commentList.length > 0 && commentList.map((comment, index) => <Comment key={index} comment={comment} />)}
      </div>
    </>
  )
}