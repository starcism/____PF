import { ICard } from '@/types/types'
import LinkContainer from '../atoms/LinkContainer'
import { useState } from 'react'
import formatDate from '@/libs/getFormDate'

export default function PostLink({ href, title, view, createdAt, profile_image, nickname, likeCount = 0, commentCount = 0 }: ICard) {
  const [liked, setLiked] = useState(false)
  const createdDate = createdAt && formatDate(createdAt)
  const handleNameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }
  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLiked(!liked)
  }

  return (
    <>
      <LinkContainer href={href} size="post">
        <div className="flex w-full h-8 items-center justify-between pt-[6px]">
          <div className="flex items-center w-[100px] h-8">
            <button onClick={handleNameClick}>
              <div className="flex items-center pl-[4px]">
                <div className="min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] mb-[2px] bg-blue-200 rounded-full"></div>
                <span className="ml-2 text-[14px] weight-350 text-viva-gray-1 select-none">{nickname}</span>
              </div>
            </button>
          </div>
          <div className="flex items-center justify-center h-8">
            <div>
              <button className="pl-[6px] pr-[8px] h-8 text-viva-4" onClick={handleLikeClick}>
                {liked ? (
                  <svg
                    className="w-10 h-10 inline-block [vertical-align: middle] mb-[2px] mr-[2px] w-[24px] h-[24px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                  </svg>
                ) : (
                  <svg
                    className="inline-block align-middle mb-[2px] mr-[2px] w-[24px] h-[24px]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                )}
                <span className="text-[14px] weight-350 select-none">{likeCount}</span>
              </button>
            </div>
            <div>
              <button className="pl-[6px] pr-[8px] h-8 text-[rgba(38,187,152,0.9)]">
                <svg
                  className="inline-block align-middle mb-[1px] mr-[2px] w-[24px] h-[24px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>

                <span className="text-[14px] weight-350 select-none">{commentCount}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full p-[4px] text-[16px] weight-500 select-none">{title}</div>
        <div className="flex w-full p-[4px] text-[16px] weight-500">
          <span className="text-[13px] weight-500 text-gray-3 select-none">{createdDate}</span>
          <span className="ml-[8px] text-[13px] weight-500 text-gray-3 select-none">{`조회 ${view}`}</span>
        </div>
      </LinkContainer>
    </>
  )
}
