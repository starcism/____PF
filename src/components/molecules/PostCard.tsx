import { Card } from '@/types/types'
import { useState } from 'react'
import formatDate from '@/libs/getFormDate'
import UserIcon from '../atoms/UserIcon'
import ModalContainer from '../atoms/ModalContainer'
import checkEnvironment from '@/libs/checkEnvironment'
import { useRouter } from 'next/navigation'

const tags = ['#유진', '#가을', '#레이', '#원영', '#리즈', '#이서']

export default function PostCard({
  boardType,
  userId,
  boardId,
  title,
  view,
  createdAt,
  tag,
  postTag,
  profile_image,
  nickname,
  liked,
  userLike,
  commentCount = 0,
  accessToken,
  UID,
  setDelete,
  isProfilePage = false
}: Card) {
  const [like, setLike] = useState(userLike)
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

  const filteredTags = tags.filter((_, index) => tag[index] === '1')
  const router = useRouter()

  const createdDate = createdAt && formatDate(createdAt)
  const handleNameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isProfilePage) {
      return
    }

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

  const deletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    try {
      const res = await fetch(checkEnvironment().concat(`/api/board/${boardType}`), {
        method: 'PUT',
        body: JSON.stringify({ boardId }),
        headers: {
          Authorization: `${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      })

      if (res.status === 200) {
        // alert('게시글을 삭제했어요')
        setDelete()
      } else if (res.status === 401) {
        alert('권한이 없어요')
      } else {
        const data = await res.json()
        alert('삭제에 실패했어요')
      }
    } catch (error) {
      alert('삭제에 실패했어요')
    }
  }

  return (
    <>
      <div className={`w-[calc(100vw-30px)] sm:w-[100vw] h-[200px] mb-[25px] max-w-[430px] md:max-w-[354px]`}>
        <div className="flex w-full h-[50px] items-center justify-between mt-[4px]">
          <div className="flex items-center w-auto h-[50px]">
            <button onClick={handleNameClick}>
              <div className="flex items-center px-[4px]">
                <UserIcon size="28" />
                <span className="ml-2 text-[14px] mb-[2px] font-700 text-gray-4 select-none overflow-hidden h-[14px] text-ellipsis">{nickname}</span>
              </div>
            </button>
          </div>
          <div className="flex items-center justify-center h-[40px]">
            <div className="flex items-center">
              <button className="flex items-center justify-center rounded-[50%] w-[32px] h-[32px] ml-[6px] text-pinkish" onClick={handleLikeClick}>
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
              <span className="text-[14px] weight-400 select-none text-pinkish">{initialLiked}</span>
            </div>
            <div className="mr-[6px] flex items-center">
              {/* <ModalContainer id={boardId}> */}
              <button className="flex items-center justify-center  ml-[6px] rounded-[50%] w-[32px] h-[32px] text-turquoise">
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
              </button>
              {/* </ModalContainer> */}
              <span className="text-[14px] weight-350 select-none text-turquoise">{commentCount}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full px-[4px]">
          <span className="text-[14px] weight-400 text-gray-6 leading-[22px] whitespace-pre-line">{title}</span>
        </div>
        <div className="flex w-full px-[4px] pt-[12px]">
          <span className="text-gray-6 leading-[26px]">
            <span className="text-black weight-500 text-[13px]">{`#${postTag} `}</span>
            {filteredTags.map((value, index) => (
              <span className="text-black weight-500 text-[13px]" key={index}>{`${value} `}</span>
            ))}
          </span>
        </div>
        <div className="flex items-center w-full px-[4px] h-[28px] text-[13px] weight-500">
          <span className="text-[13px] weight-500 text-gray-3 select-none mr-[4px]">{createdDate}</span>
          {/* {view && <span className="ml-[8px] text-[13px] weight-500 text-gray-3 select-none">{`조회 ${view}`}</span>} */}
          {userId === UID && (
            <button
              onClick={(e) => deletePost(e)}
              className="flex items-center justify-center transition-colors duration-200 rounded-[20px] w-[42px] h-[28px] text-darkgold hover:bg-darkgold hover:text-white"
            >
              <span className="text-[13px] font-400 select-none">삭제</span>
            </button>
          )}
        </div>
      </div>
    </>
  )
}
