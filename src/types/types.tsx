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
  videoId?: string
}

export interface IPhotoBoard extends IBoard {
  images?: string[]
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

export interface IPhotoBoard {
  posts: IPhotoBoard[]
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
  key: number
  href: string
  url?: string
  title?: string
  view?: number
  profile_image?: string
  nickname?: string
  likeCount?: number
  commentCount?: number
  createdAt?: string
}

export interface IPhotoCard extends ICard {
  images?: string[]
}
