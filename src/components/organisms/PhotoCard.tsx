'use client'
import PostCardWithLink from '../molecules/PostCardWithLink'
import { IPhotoCard } from '@/types/types'
import PhotoSlider from '../molecules/PhotoSlider'
import PhotoViewer from '../molecules/PhotoViwer'

export default function PhotoCard({ key, images, href, title, view, createdAt, profile_image, nickname, likeCount = 0, commentCount = 0 }: IPhotoCard) {
  return (
    <>
      <div className="mx-[14px] mt-[16px]">
        <PhotoViewer images={images} />
        <PostCardWithLink
          key={key}
          href={href}
          title={title}
          createdAt={createdAt}
          nickname={nickname}
          likeCount={likeCount}
          commentCount={commentCount}
        />
      </div>
    </>
  )
}
