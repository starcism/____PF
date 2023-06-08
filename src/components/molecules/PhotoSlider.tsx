'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SWITHy_1 from '@/utils/SWITHy_logo.png'
import SWITHy_2 from '@/utils/SWITHy_logo1.png'
import SWITHy_3 from '@/utils/SWITHy_logo2.png'
import SWITHy_4 from '@/utils/SWITHy_logo4.png'
interface SliderProps {
  images?: string[] // 이미지 URL 배열
}

export default function PhotoSlider({ images = [] }: SliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  return (
    <div className="slider-container">
      <Image alt="이미지" src={SWITHy_1} width={width} height={height}/>
      <div className="slider-navigation">
        <button onClick={handlePrevImage}>{'<'}</button>
        <div className="slider-indicators">
          {images.map((_, index) => (
            <div key={index} className={`slider-indicator ${index === currentImageIndex ? 'active' : ''}`} />
          ))}
        </div>
        <button onClick={handleNextImage}>{'>'}</button>
      </div>
    </div>
  )
}
