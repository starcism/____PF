'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const imagePaths = [
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
  '/images/yujin_login.jpeg',
  '/images/gaeul_login_.jpeg',
  '/images/rei_login.jpeg',
  '/images/wonyoung_login.jpeg',
  '/images/liz_login_.jpeg',
  '/images/leeseo_login.jpeg',
]

const alts = [
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
  'yujin',
  'gaeul',
  'rei',
  'wonyo',
  'liz',
  'leeseo',
]

export default function PhotoSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [width, setWidth] = useState(440)
  const [height, setHeight] = useState(585)
  const breakpointWidth = 574

  const isWideViewport = width >= breakpointWidth

  const handleResize = () => {
    const screenWidth = window.innerWidth
    setWidth(screenWidth)
    setHeight((screenWidth * 1500) / 1000) // 이미지 비율 유지
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length)
    }, 3000)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="relative overflow-hidden h-[100vh]">
      {isWideViewport ? (
        <div>하하</div>
      ) : (
        <div
          className="absolute top-0 left-0 transition-transform duration-500"
          style={{
            width: `${width * imagePaths.length}px`,
            transform: `translateX(-${currentImageIndex * width}px)`,
          }}
        >
          {imagePaths.map((imagePath, index) => (
            <div key={index} className="relative float-left h-[100vh] w-[100vw]">
              <Image
                alt={alts[index]}
                src={imagePath}
                fill
                className="-z-10"
                style={{
                  objectPosition: 'center',
                  position: 'absolute',
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  // marginLeft: 'auto', // 이미지를 수평 중앙에 위치
                  // marginRight: 'auto', // 이미지를 수평 중앙에 위치
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
