import checkEnvironment from '@/libs/checkEnvironment'
import { useEffect, useState } from 'react'
interface Props {
  boardType: string
  boardId?: string
  accessToken?: string | null
  liked: number
  userLike?: boolean
}

export default function PostInfo({ boardType, boardId, accessToken, liked, userLike }: Props) {
  const [like, setLike] = useState(false)
  const [initialLiked, setInitialLiked] = useState(liked)
  const [isSubmit, setSubmit] = useState(false)
  const handleLiked = () => {
    if (like) {
      setLike(false)
      setInitialLiked(initialLiked - 1)
    } else {
      setLike(true)
      setInitialLiked(initialLiked + 1)
    }
  }

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!accessToken) {
      return
    }

    if (isSubmit) {
      return
    }
    
    setSubmit(true)

    try {
      const res = await fetch(checkEnvironment().concat('/api/board/like'), {
        method: 'POST',
        body: JSON.stringify({ boardId, boardType }),
        headers: {
          Authorization: `${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      })

      if (res.status === 200) {
        const { userLike } = await res.json()
        handleLiked()
      } else if (res.status === 401) {
        // alert('권한이 없어요')
      } else {
        // alert('좋아요 설정에 실패했어요1')
      }
    } catch (error) {
      // alert('좋아요 설정에 실패했어요2')
    } finally {
      setSubmit(false)
    }
  }

  useEffect(() => {
    if (userLike) {
      setLike(userLike)
    }
  }, [userLike])

  return (
    <>
      <div className="px-[13px]">
        <div className="flex items-center h-[40px]">
          <div className="flex items-center">
            <button className="flex items-center justify-center rounded-[50%] w-[24px] h-[24px] ml-[8px] text-pinkish" onClick={handleLikeClick}>
              <svg
                className={`inline-block align-middle w-[24px] h-[24px] ${
                  like ? 'fill-pinkish' : 'fill-none hover:text-lightpinkish'
                } transition-transform transform-gpu active:scale-125`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                strokeWidth={1.3}
                stroke="currentColor"
              >
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>
            </button>
            <span className="text-[14px] ml-[6px] weight-400 select-none text-pinkish">{initialLiked}</span>
          </div>
          {/* <div className="ml-[4px] flex items-center">
            <div className="flex items-center justify-center select-none ml-[6px] rounded-[50%] w-[24px] h-[24px] text-turquoise">
              <svg
                className="inline-block align-middle mb-[1px] w-[24px] h-[24px]"
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
            </div>
            <span className="text-[14px] ml-[4px] weight-400 select-none text-turquoise">{commentCount}</span>
          </div> */}
        </div>
      </div>
    </>
  )
}
