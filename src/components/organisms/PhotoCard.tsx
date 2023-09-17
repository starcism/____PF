'use client'
import { PhotoCard } from '@/types/types'
import PhotoViewer from '../molecules/PhotoViwer'
import PostCard from '../molecules/PostCard'
import { useState } from 'react'

export default function PhotoCard({
  userId,
  photoUrls,
  boardId,
  title,
  view,
  createdAt,
  tag,
  postTag,
  nickname,
  liked = 0,
  commentCount = 0,
  accessToken,
  UID,
}: PhotoCard) {
  const [isDeleted, setIsDeleted] = useState(false)
  const handleDelete = () => {
    setIsDeleted(true)
  }

  if (isDeleted) {
    return <></>
  }

  return (
    <>
      <div className="mx-[14px] mt-[16px]">
        <PhotoViewer photoUrls={photoUrls} />
        <PostCard
          boardType="photo"
          userId={userId}
          boardId={boardId}
          title={title}
          createdAt={createdAt}
          nickname={nickname}
          liked={liked}
          postTag={postTag}
          tag={tag}
          commentCount={commentCount}
          accessToken={accessToken}
          UID={UID}
          setDelete={handleDelete}
        />
      </div>
    </>
  )
}
