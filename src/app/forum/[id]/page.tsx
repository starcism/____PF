'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import CommentInput from '@/components/organisms/CommentInput'
import Comments from '@/components/organisms/Comments'
import PostInfo from '@/components/organisms/PostInfo'
import FreeBoard from '@/components/templates/FreeBoard'
import LoadingCommentInput from '@/components/templates/LoadingCommentInput'
import PostLayout from '@/components/templates/PostLayout'
import useComment from '@/libs/useComment'
import usePost from '@/libs/usePost'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

export default function Page(props: Props) {
  const boardId = props.params.id
  const { post } = usePost(boardId)
  const { userInfoLoading, commentAreaLoading, loggedIn, like, commentList, accessToken } = useComment(boardId)

  if (!post) {
    return (
      <PostLayout boardType="포럼">
        <LoadingSpinner isBeforePost={true} />
      </PostLayout>
    )
  }
  return (
    <>
      <PostLayout boardType="포럼">
        <FreeBoard
          nickname={post.nickname}
          title={post.title}
          content={post.content}
          view={post.view}
          createdAt={post.created_at}
          updatedAt={post.updated_at}
        />
        {commentAreaLoading ? (
          <PostInfo commentCount={post.comment_count} liked={post.liked} />
        ) : (
          <PostInfo commentCount={post.comment_count} liked={post.liked} userLike={like} />
        )}
        {userInfoLoading ? <LoadingCommentInput /> : <CommentInput accessToken={accessToken} loggedIn={loggedIn} />}
        {commentAreaLoading && !post ? <></> : commentAreaLoading && post ? <LoadingSpinner isBeforePost={true} /> : <Comments commentList={commentList} />}
      </PostLayout>
    </>
  )
}
