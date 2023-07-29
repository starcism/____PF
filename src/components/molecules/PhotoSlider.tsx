'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface SliderProps {
  images?: string[]
}

//그렇다면 일반적인 서비스에서 허용하는 확장자를 포함해서 유효성 검사를 하고, 썸네일용 이미지는 width가 468이, height는 width에 맞춰서 조정되도록 

export default function PhotoSlider({ images = [] }: SliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [width, setWidth] = useState(440)
  const [height, setHeight] = useState(585)

  const handleResize = () => {
    const screenWidth = window.innerWidth
    if (screenWidth <= 472) {
      setWidth(screenWidth - 14)
      setHeight((screenWidth / 468) * 585)
    } else {
      setWidth(468)
      setHeight(585)
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

  const handleSwipe: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const touchStartX = e.touches[0].clientX

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentX = e.touches[0].clientX
      const deltaX = touchCurrentX - touchStartX

      if (deltaX > 50) {
        handlePrevImage()
      } else if (deltaX < -50) {
        handleNextImage()
      }
    }

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }

    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  return (
    <div className="relative z-0" onTouchStart={handleSwipe}>
      <Image alt="이미지" src={images[currentImageIndex]} width={width} height={height} />
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center">
        <button
          className="p-2 text-white bg-nav-button rounded-full transition duration-150 ease-in-out hover:scale-125 disabled:opacity-0 disabled:select-none"
          onClick={handlePrevImage}
          disabled={currentImageIndex === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center">
        <button
          className="p-2 text-white bg-nav-button rounded-full transition duration-150 ease-in-out hover:scale-125 disabled:opacity-0 disabled:select-none"
          onClick={handleNextImage}
          disabled={currentImageIndex === images.length - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-[6px]">
        {images.map((_, index: number) => (
          <button
            key={index}
            className={`w-[7px] h-[7px] rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-dot-nav'}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
