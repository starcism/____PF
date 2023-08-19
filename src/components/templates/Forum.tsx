import { IBoard } from '@/types/types'
import PostItem from '../organisms/PostItem'
import checkEnvironment from '@/libs/checkEnvironment'

async function getPost(pageIndex: number) {
  try {
    const res = await fetch(checkEnvironment().concat(`/api/board/forum?pageIndex=${pageIndex}`), {
      method: 'GET',
      cache: 'no-store',
    })
    if (res.status === 200) {
      const { posts, totalPages } = await res.json()
      return { posts, totalPages }
    } else if (res.status === 204) {
      return { posts: undefined }
    } else {
      return { posts: undefined }
    }
  } catch (error) {
    console.log(error)
    return { posts: undefined }
  }
}

export default async function Forum() {
  const { posts, totalPages } = await getPost(1)

  return (
    <>
      <div>
        {posts &&
          posts.map((post: IBoard, index: number) => (
            <PostItem
              key={index}
              boardid={post.board_id}
              title={post.title}
              view={post.view}
              likeCount={post.liked}
              commentCount={post.comment_count}
              createdAt={post.created_at}
              updatedAt={post.updated_at}
            />
          ))}
      </div>
    </>
  )
}
