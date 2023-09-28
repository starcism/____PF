interface IUser {
  user_id: number
  profile_image: string
  nickname: string
}

export interface Board {
  key?: number
  board_id: number
  title: string
  view: number
  created_at: string
  updated_at?: string
  deleted_at?: string | null
  nickname: string
  icon: string
  liked: number
  comment_count: number
}

export interface PhotoBoard extends Board {
  tag: string
  post_tag: string
  user_id: number
  user_like: boolean
  photo_url: string[]
}

export interface FreePost extends Board {
  content: string
  user_id: number
}

export interface ForumData {
  posts: Board[]
  totalPages: number
}

export interface PhotoBoardData {
  posts: PhotoBoard[]
  photoUrls?: string[]
}

export interface VideoBoardData {
  posts: VideoBoard[]
}

export interface VideoBoard {
  key?: number
  board_id: number
  title: string
  view: number
  created_at: string
  updated_at?: string
  deleted_at?: string | null
  nickname: string
  icon: string
  liked: number
  comment_count: number
  youtube_url: string
  user_id: number
  tag: string
  post_tag: string
  user_like: boolean
}

export interface IPostItem {
  key: number
  boardid: number
  title: string
  view: number
  likeCount: number
  commentCount: number
  createdAt: string
  updatedAt?: string
  nickname: string
  icon: string
}

export interface Card {
  key?: number
  userId: number
  title: string
  view?: number
  icon: string
  nickname: string
  liked: number
  commentCount: number
  createdAt: string
  boardId: number
  UID: number | null
  tag: string
  postTag: string
  boardType: string
  accessToken: string | null
  setDelete: () => void
  userLike: boolean
  isProfilePage?: boolean
}

export interface PhotoCard extends Omit<Card, 'setDelete'> {
  photoUrls: string[]
}

export interface VideoCard extends Omit<Card, 'setDelete'> {
  youtubeUrl: string
}

export interface Comments {
  board_id: number
  comment_id: string
  created_at: string
  deleted_at: string | null
  reply: string
  updated_at: string
  user_id?: number
  is_author?: boolean | undefined
  icon: string
  nickname: string
}
