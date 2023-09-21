'use client'

import Image from 'next/image'
import UserIcon, { ChangableProfileImage } from '../atoms/UserIcon'

interface Props {
  nickname: string
  profile_image: string
}

export default function Profile({ nickname = '꾸미맘', profile_image = '/images/liz1.jpeg' }: Props) {
  return (
    <div className="flex w-full h-[120px] p-[20px] bg-white">
      <div className="flex w-full justify-between">
        <div className="flex items-center">
          <ChangableProfileImage size="60" />
          <span className="font-sans h-[20px] ml-4 text-[16px] weight-500 overflow-y-hidden text-ellipsis">{nickname}</span>
          <button type="button" className="text-turquoise w-[24px] h-[24px] ml-[2px]">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 48 48">
              <path
                fill="none"
                stroke="#85b8cb"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M18.4,21.8L32.1,8.1c2.3-2.3,6-2.1,8.1,0.4c1.8,2.2,1.5,5.5-0.5,7.5l-2.8,2.8"
              ></path>
              <path
                fill="none"
                stroke="#85b8cb"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M32.5,23.3L17.9,37.8c-0.4,0.4-0.8,0.6-1.3,0.8L6.5,41.5l2.9-10.1c0.1-0.5,0.4-0.9,0.8-1.3l3.7-3.7"
              ></path>
              <line x1="29.1" x2="36.9" y1="11.1" y2="18.9" fill="none" stroke="#85b8cb" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
