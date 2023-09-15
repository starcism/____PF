'use client'
import PostCardWithLink from '../molecules/PostCardWithLink'
import { IPhotoCard } from '@/types/types'
import PhotoViewer from '../molecules/PhotoViwer'

export default function PhotoCard({ photoUrls, href, title, view, createdAt, tag, postTag, nickname, liked = 0, commentCount = 0 }: IPhotoCard) {
  return (
    <>
      <div className="mx-[14px] mt-[16px]">
        <PhotoViewer photoUrls={photoUrls} />
        <PostCardWithLink
          href={href}
          title={title}
          createdAt={createdAt}
          nickname={nickname}
          liked={liked}
          postTag={postTag}
          tag={tag}
          commentCount={commentCount}
        />
      </div>
    </>
  )
}
