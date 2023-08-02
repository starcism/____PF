'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

//그렇다면 일반적인 서비스에서 허용하는 확장자를 포함해서 유효성 검사를 하고, 썸네일용 이미지는 width가 468이, height는 width에 맞춰서 조정되도록

interface Props {
  images?: string[]
}

export default function PhotoViewer({ images = [] }: Props) {
  const length = images.length

  return (
    <div className="flex-row px-[34px] w-screen">
      <div
        className={`bg-white ${length > 1 ? 'grid grid-cols-2 gap-[3px]' : 'grid'} ${
          length > 2 ? 'gird-rows-2' : length === 2 && 'grid-rows-1'
        } h-auto w-full rounded-[20px] overflow-hidden`}
      >
        {images.map((image, i) => (
          <div
            key={i}
            className={`${length === 3 && i === 0 ? 'row-start-1 row-end-3 h-full' : length === 2 ? 'h-[30vh]' : length === 1 ? 'h-full' : 'h-[15vh]'}`}
          >
            <Image src={image} alt="_blank" fill sizes="(min-width: 400px) 50vw, 100vw" className="relative w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
