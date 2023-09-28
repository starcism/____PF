import ProfileInfo from '../organisms/ProfileInfo'
import ProfileSetter from '../organisms/ProfileSetter'

import ProfilePosts from '../organisms/ProfilePosts'

interface Props {
  accessToken: string
  userId: number
  nickname: string
  setNickname: React.Dispatch<React.SetStateAction<string | null>>
  createdAt: string
  profile_image: string
}

export default function ProfileLayout({ accessToken, userId, nickname = 'LOVEDIVE', setNickname, createdAt, profile_image = '/images/liz1.jpeg' }: Props) {
  return (
    <>
      <div className="p-[20px]">
        <ProfileSetter accessToken={accessToken} nickname={nickname} setNickname={setNickname} profile_image={profile_image} />
      </div>
      <div className="px-[20px] py-[15px] custom-border-b-1">
        <ProfileInfo accessToken={accessToken} loginMethod="kakao" createdAt={createdAt} />
      </div>
      <div>
        <ProfilePosts accessToken={accessToken} userId={userId} />
      </div>
    </>
  )
}
