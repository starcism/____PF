'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import CommentInput from '@/components/organisms/CommentInput'
import Comments from '@/components/organisms/Comments'
import PostInfo from '@/components/organisms/PostInfo'
import FreePost from '@/components/templates/FreePost'
import LoadingCommentInput from '@/components/templates/LoadingCommentInput'
import PostLayout from '@/components/templates/PostLayout'
import { useUserState } from '@/libs/UserProvider'
import useComment from '@/libs/useComment'
import usePost from '@/libs/usePost'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

export default function Page(props: Props) {
  const boardId = props.params.id
  const router = useRouter()
  const { post, deleted } = usePost(boardId)
  const { profileImage } = useUserState()
  const { userInfoLoading, commentAreaLoading, loggedIn, like, commentList, accessToken, refresh, refreshComments, UID } = useComment(boardId)

  if (!post) {
    return (
      <PostLayout boardType="포럼">
        <LoadingSpinner isBeforePost={true} />
      </PostLayout>
    )
  }

  if (deleted) {
    router.back()
  }

  return (
    <>
      <PostLayout boardType="포럼">
        <FreePost
          nickname={post.nickname}
          icon={post.icon}
          title={post.title}
          content={post.content}
          view={post.view}
          createdAt={post.created_at}
          updatedAt={post.updated_at}
          UID={UID}
          boardId={post.board_id}
          userId={post.user_id}
          accessToken={accessToken}
        />
        {commentAreaLoading ? (
          <PostInfo liked={post.liked} boardType="free" />
        ) : (
          <PostInfo liked={post.liked} userLike={like} boardType="free" boardId={boardId} accessToken={accessToken} />
        )}
        {userInfoLoading ? <LoadingCommentInput /> : <CommentInput profile_image={profileImage} boardId={boardId} accessToken={accessToken} loggedIn={loggedIn} refresh={refreshComments} />}
        {commentAreaLoading && !post ? (
          <></>
        ) : (commentAreaLoading || refresh) && post ? (
          <LoadingSpinner isBeforePost={true} />
        ) : (
          <Comments profile_image={profileImage} commentList={commentList} refresh={refreshComments} boardId={boardId} accessToken={accessToken} loggedIn={loggedIn} />
        )}
      </PostLayout>
    </>
  )
}
