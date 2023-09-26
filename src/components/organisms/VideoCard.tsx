'use client'
import { useState } from 'react'
import YoutubeViewer from '../atoms/YoutubeViewer'
import PostCard from '../molecules/PostCard'
import { VideoCard } from '@/types/types'

export default function VideoCard({
  userId,
  youtubeUrl,
  boardId,
  title,
  view,
  createdAt,
  tag,
  postTag,
  nickname,
  liked = 0,
  userLike,
  commentCount = 0,
  accessToken,
  UID,
  isProfilePage = false
}: VideoCard) {
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
        <YoutubeViewer url={youtubeUrl} hasBorderRadius={true} />
        <PostCard
          boardType="video"
          userId={userId}
          boardId={boardId}
          title={title}
          createdAt={createdAt}
          nickname={nickname}
          liked={liked}
          userLike={userLike}
          postTag={postTag}
          tag={tag}
          commentCount={commentCount}
          accessToken={accessToken}
          UID={UID}
          setDelete={handleDelete}
          isProfilePage={isProfilePage}
        />
      </div>
    </>
  )
}
