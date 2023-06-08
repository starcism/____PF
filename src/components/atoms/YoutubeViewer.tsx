'use client'

import React, { useEffect, useState } from 'react'

interface IYoutubeViewer {
  url?: string
  hasBorderRadius?: boolean
}

export default function YoutubeViewer({ url, hasBorderRadius = false }: IYoutubeViewer) {
  const [width, setWidth] = useState(440)
  const [height, setHeight] = useState(247.5)

  const handleResize = () => {
    const screenWidth = window.innerWidth
    if (screenWidth <= 454) {
      setWidth(screenWidth - 14)
      setHeight((screenWidth / 440) * 247.5)
    } else {
      setWidth(440)
      setHeight(247.5)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const youtubeUrlRegex = /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/g
  const match = url && youtubeUrlRegex.exec(url)
  const videoId = match && match[7]

  return (
    <div className="flex justify-center items-center pb-[6px]">
      {videoId ? (
        <iframe
          className={`rounded-lg ${hasBorderRadius && 'border-radius-18px'}`}
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${videoId}?fs=0&modestbranding=1`}
          title="YouTube video player"
        ></iframe>
      ) : (
        <div></div>
      )}
    </div>
  )
}
