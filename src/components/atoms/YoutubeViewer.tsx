'use client'

import React, { useEffect, useState } from 'react'

interface IYoutubeViewer {
  url?: string | null | undefined
  hasBorderRadius?: boolean
  full?: boolean
}

export default function YoutubeViewer({ url, full = false, hasBorderRadius = false }: IYoutubeViewer) {
  const youtubeUrlRegex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url && youtubeUrlRegex.exec(url)
  const videoId = match && match[2]

  return (
    <div className={`relative pt-[56.25%] overflw-hidden w-full h-0`}>
      {videoId ? (
        <iframe
          className={`absolute top-0 w-full h-full max-w-[430px] max-h-[242px] md:max-w-[374px] md:max-h-[210px] ${hasBorderRadius && 'rounded-[18px]'}`}
          width={430}
          height={242}
          src={`https://www.youtube.com/embed/${videoId}?fs=1&modestbranding=1`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      ) : (
        <div></div>
      )}
    </div>
  )
}
