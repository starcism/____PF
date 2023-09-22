import ProfileInfo from '../organisms/ProfileInfo'
import ProfileSetter from '../organisms/ProfileSetter'

interface Props {
  accessToken: string
  nickname: string
  profile_image: string
}

export default function ProfileLayout({ accessToken, nickname = '꾸미맘', profile_image = '/images/liz1.jpeg' }: Props) {
  return (
    <>
      <div className="p-[20px]">
        <ProfileSetter accessToken={accessToken} nickname={nickname} profile_image={profile_image} />
      </div>
      <div className="px-[20px] py-[15px] custom-border-b-1">
        <ProfileInfo loginMethod="kakao" createdAt="2023-07-26T23:53:06.635Z" />
      </div>
    </>
  )
}
