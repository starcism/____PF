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
  icon,
  liked = 0,
  userLike,
  commentCount = 0,
  accessToken,
  UID,
  isProfilePage = false
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
      <div className="mt-[16px]">
        <PhotoViewer photoUrls={photoUrls} boardId={boardId} />
        <PostCard
          boardType="photo"
          userId={userId}
          boardId={boardId}
          title={title}
          createdAt={createdAt}
          nickname={nickname}
          icon={icon}
          liked={liked}
          userLike={userLike}
          postTag={postTag}
          tag={tag}
          commentCount={commentCount}
          accessToken={accessToken}
          UID={UID}
          setDelete={handleDelete}
          isProfilePage = {isProfilePage}
        />
      </div>
    </>
  )
}
