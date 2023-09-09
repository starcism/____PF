'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface IYoutubeViewer {
  url?: string
}

export default function YoutubeThumbnail({ url }: IYoutubeViewer) {

  const youtubeUrlRegex = /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/g
  const match = url && youtubeUrlRegex.exec(url)
  const videoId = match && match[7]

  return (
    <div className="flex justify-center items-center py-[20px]">
      {videoId ? (
        <Image
          className='rounded-[10px] mx-[10px]'
          width={330}
          height={186}
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="Youtube Thumbnail"
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}
