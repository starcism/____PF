'use client'

import checkEnvironment from '@/libs/checkEnvironment'
import { Board, PhotoBoard, VideoBoard } from '@/types/types'
import { useEffect, useState } from 'react'
import PostItem from './PostItem'
import BoardLayout from '../templates/BoardLayout'
import PhotoCard from '@/components/organisms/PhotoCard'
import VideoCard from '@/components/organisms/VideoCard'
import LoadingSpinner from '../atoms/LoadingSpinner'
import useOutsideRef from '@/libs/useOutsideRef'

interface Props {
  accessToken: string
  userId: number
}

export default function ProfilePosts({ accessToken, userId }: Props) {
  const [boardType, setBoardType] = useState<string>('forum')
  const [boardTypeText, setBoardTypeText] = useState<{ [key: string]: string }>({
    forum: '포럼',
    photo: '갤러리',
    video: '영상',
  })
  const [onSelectBox, setOnSelectBox] = useState(false)
  const handleSelectBox = () => {
    setOnSelectBox(!onSelectBox)
  }
  const outsideRef = useOutsideRef(handleSelectBox)

  const [posts, setPosts] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getPostData = async (boardType: string) => {
    setLoading(true)
    setBoardType(boardType)

    try {
      const res = await fetch(checkEnvironment().concat('/api/user/posts'), {
        method: 'POST',
        body: JSON.stringify({ userId, boardType }),
      })

      if (res.ok) {
        const { data } = await res.json()
        setPosts(data)
      } else {
        setPosts(null)
      }
    } catch (error) {
      setPosts(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPostData('forum')
  }, [])

  return (
    <>
      <div className="flex w-full px-[20px] pt-[10px] justify-between">
        <div className="flex select-none overflow-x-auto flex-nowrap scrollbar-hide text-ellipsis whitespace-nowrap">
          <button className="w-[60px] h-[40px]">
            <span className={`text-[16px] text-turquoise`}>작성글</span>
          </button>
          {/* <button className="w-[60px] h-[40px] ml-[10px]">
              <span className="text-[16px] text-gray-4">댓글</span>
            </button>
            <button className="w-[60px] h-[40px] ml-[10px]">
              <span className="text-[16px] text-gray-4">좋아요</span>
            </button> */}
        </div>
        <div onClick={() => setOnSelectBox(true)} className="flex justify-center items-center relative min-w-[80px] h-[40px] select-none">
          <div className="flex justify-between items-center px-[10px] h-auto w-full rounded-[5px]">
            <span className="text-[14px] text-gray-4 min-w-[40px]">{boardTypeText[boardType]}</span>
            <span className={`arrow ${onSelectBox ? 'active' : ''}`}>
              <span />
              <span />
            </span>
          </div>
          {onSelectBox && (
            <div
              ref={outsideRef}
              className="z-[1000] absolute top-[40px] flex flex-col justify-center w-[80px] h-auto rounded-[10px] border border-turquoise border-solid bg-white shadow1"
            >
              <div onClick={() => getPostData('forum')} className="flex items-center px-[10px] py-[12px] rounded-t-[10px] hover:bg-hover-button">
                <span className={`text-[14px] ${boardType === 'forum' ? 'text-turquoise font-500' : 'text-gray-3 font-400'}`}>포럼</span>
              </div>
              <div onClick={() => getPostData('photo')} className="flex items-center px-[10px] py-[12px] hover:bg-hover-button">
                <span className={`text-[14px] ${boardType === 'photo' ? 'text-turquoise font-500' : 'text-gray-3 font-400'}`}>갤러리</span>
              </div>
              <div onClick={() => getPostData('video')} className="flex items-center px-[10px] py-[12px] rounded-b-[10px] hover:bg-hover-button">
                <span className={`text-[14px] ${boardType === 'video' ? 'text-turquoise font-500' : 'text-gray-3 font-400'}`}>영상</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {loading && <LoadingSpinner />}
      {!loading &&
        boardType === 'forum' &&
        (posts ? (
          posts.map((post: Board, index: number) =>
            post.deleted_at === null ? (
              <PostItem
                key={index}
                boardid={post.board_id}
                title={post.title}
                view={post.view}
                likeCount={post.liked}
                commentCount={post.comment_count}
                createdAt={post.created_at}
                updatedAt={post.updated_at}
                nickname={post.nickname}
              />
            ) : (
              <></>
            ),
          )
        ) : (
          <div className="w-full h-[200px] text-gray-3 flex justify-center items-center select-none">아직 작성한 글이 없어요</div>
        ))}
      {!loading && boardType === 'photo' && (
        <BoardLayout>
          {posts ? (
            posts.map(
              (post: PhotoBoard, index: number) =>
                post.deleted_at === null && (
                  <div key={index} className="w-[100vw] max-w-[430px] px-[15px] sm:px-[0px] sm:mx-[auto] md:max-w-[354px]">
                    <PhotoCard
                      boardType="photo"
                      userId={post.user_id}
                      photoUrls={post.photo_url}
                      boardId={post.board_id}
                      title={post.title}
                      view={post.view}
                      createdAt={post.created_at}
                      nickname={post.nickname}
                      liked={post.liked}
                      userLike={post.user_like}
                      commentCount={post.comment_count}
                      tag={post.tag}
                      postTag={post.post_tag}
                      accessToken={accessToken as string | null}
                      UID={userId as number | null}
                      isProfilePage = {true}
                    />
                  </div>
                ),
            )
          ) : (
            <div className="w-[100vw] max-w-[768px] h-[200px] text-gray-3 flex justify-center items-center select-none">아직 작성한 글이 없어요</div>
          )}
        </BoardLayout>
      )}
      {!loading && boardType === 'video' && (
        <BoardLayout>
          {posts ? (
            posts.map(
              (post: VideoBoard, index: number) =>
                post.deleted_at === null && (
                  <div key={index} className="w-[100vw] max-w-[430px] px-[15px] sm:px-[0px] sm:mx-[auto] md:max-w-[354px]">
                    <VideoCard
                      boardType="photo"
                      userId={post.user_id}
                      youtubeUrl={post.youtube_url}
                      boardId={post.board_id}
                      title={post.title}
                      view={post.view}
                      createdAt={post.created_at}
                      nickname={post.nickname}
                      liked={post.liked}
                      userLike={post.user_like}
                      commentCount={post.comment_count}
                      tag={post.tag}
                      postTag={post.post_tag}
                      accessToken={accessToken as string | null}
                      UID={userId as number | null}
                      isProfilePage = {true}
                    />
                  </div>
                ),
            )
          ) : (
            <div className="w-[100vw] max-w-[768px] h-[200px] text-gray-3 flex justify-center items-center select-none">아직 작성한 글이 없어요</div>
          )}
        </BoardLayout>
      )}
    </>
  )
}
