interface IUser {
  user_id: number
  profile_image: string
  nickname: string
}

export interface IBoard {
  key?: number
  board_id: number
  title: string
  view: number
  created_at: string
  updated_at?: string
  deleted_at?: string | null
  nickname: string
  liked: number
  comment_count: number
}

export interface IVideoBoard extends IBoard {
  youtubeUrl?: string
  user_id: number
  videoId?: string
}

export interface PhotoBoard extends IBoard {
  tag: string
  post_tag: string
  user_id: number
  photo_url: string[]
}

export interface IPhotoBoard {
  posts: PhotoBoard[]
  photoUrls?: any
  images?: any
}

export interface IFreeBoard {
  posts: IBoard[]
  totalPages: number
}

export interface IFreePost extends IBoard {
  content: string
  user_id: number
}

export interface IVideoBoard {
  posts: IVideoBoard[]
  totalPage: number
}

export interface IPostItem {
  key: number
  boardid: number
  title?: string
  view?: number
  likeCount?: number
  commentCount?: number
  createdAt?: string
  updatedAt?: string
  nickname?: string
}

export interface ICard {
  key?: number
  userId: number
  url?: string
  title?: string
  view?: number
  profile_image?: string
  nickname?: string
  liked?: number
  commentCount?: number
  createdAt?: string
  tag: string
  postTag: string
  boardId: number
  UID: number | null
  accessToken: string | null
  setDelete: () => void
}

export interface IPhotoCard extends Omit<ICard, 'setDelete'> {
  photoUrls: string[]
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
