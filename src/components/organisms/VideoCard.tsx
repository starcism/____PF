'use client'
import YoutubeViewer from '../atoms/YoutubeViewer'
import PostCardWithLink from '../molecules/PostCardWithLink'
import { ICard } from '@/types/types'

export default function VideoCard({ key, href, url, title, view, createdAt, profile_image, nickname, likeCount = 0, commentCount = 0 }: ICard) {
  return (
    <>
      <div className="mx-[14px] mt-[16px]">
        <YoutubeViewer url={url} hasBorderRadius={true} />
        <PostCardWithLink key={key} href={href} title={title} view={view} createdAt={createdAt} nickname={nickname} likeCount={likeCount} commentCount={commentCount} />
      </div>
    </>
  )
}
