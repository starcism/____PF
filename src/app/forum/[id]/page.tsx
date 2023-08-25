'use client'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import CommentArea from '@/components/organisms/CommentArea'
import FreeBoard from '@/components/templates/FreeBoard'
import LoadingCommentArea from '@/components/templates/LoadingCommentArea'
import PostLayout from '@/components/templates/PostLayout'
import useAuth from '@/libs/useAuth'
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
        {loading ? (
          <>
            <LoadingCommentArea liked={post.liked} commentCount={post.comment_count} />
            <LoadingSpinner isBeforePost={true} />
          </>
        ) : (
          <CommentArea boardId={boardId} commentCount={post.comment_count} liked={post.liked} />
        )}
      </PostLayout>
    </>
  )
}
