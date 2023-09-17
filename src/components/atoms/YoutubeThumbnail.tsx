'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface IYoutubeViewer {
  url?: string
  deleteButton: (s: string) => void
}

export default function YoutubeThumbnail({ url, deleteButton }: IYoutubeViewer) {
  const youtubeUrlRegex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url && youtubeUrlRegex.exec(url)
  const videoId = match && match[2]

  //유튜브 API로 실제로 없는 영상일 경우의 예외처리 추가해야 함.
  return (
    <div className="flex justify-center items-center py-[20px]">
      {videoId ? (
        <div className="relative">
          <Image
            className="rounded-[10px] mx-[10px]"
            width={330}
            height={186}
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Youtube Thumbnail"
          />
          <button type="button" className="absolute top-0 right-0 text-darkgold w-9 h-9 flex items-center justify-center" onClick={() => deleteButton('')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-[12px] mb-[3px]">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="w-[330px] h-[186px] flex justify-center items-center rounded-[10px] mx-[10px]">유효하지 않은 주소입니다.</div>
      )}
    </div>
  )
}
