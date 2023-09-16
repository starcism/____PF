'use client'
import YoutubeViewer from '../atoms/YoutubeViewer'
import PostCardWithModal from '../molecules/PostCard'
import { ICard } from '@/types/types'

export default function VideoCard({ key, boardId, url, title, view, createdAt, profile_image, nickname, likeCount = 0, commentCount = 0 }: ICard) {
  return (
    <>
      <div className="mx-[14px] mt-[16px]">
        <YoutubeViewer url={url} hasBorderRadius={true} />
        <PostCardWithModal
          key={key}
          boardId={boardId}
          title={title}
          view={view}
          createdAt={createdAt}
          nickname={nickname}
          liked={liked}
          commentCount={commentCount}
        />
      </div>
    </>
  )
}
