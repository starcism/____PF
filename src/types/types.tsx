interface IUser {
  userid: number
  profile_image: string
  nickname: string
}

interface IBoard {
  boardid: number
  category: string
  title: string
  view: number
  createdAt: string
  user: IUser
  likeCount: number
  commentCount: number
}

export interface IVideoBoard extends IBoard {
  youtubeUrl?: string
  videoId?: string
}

export interface IPhotoBoard extends IBoard {
  images?: string[]
}

export interface IFreePost {
  list: IBoard[]
  listTotalPage: number
  listTotalCount: number
}

export interface IVideoPost {
  list: IVideoBoard[]
  listTotalPage: number
  listTotalCount: number
}

export interface IPhotoPost {
  list: IPhotoBoard[]
  listTotalPage: number
  listTotalCount: number
}

export interface IPost {
  key: number
  boardid: number
  title?: string
  view?: number
  likeCount?: number
  commentCount?: number
  createdAt?: string
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