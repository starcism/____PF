'use client'

import checkEnvironment from '@/libs/checkEnvironment'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'

//그렇다면 일반적인 서비스에서 허용하는 확장자를 포함해서 유효성 검사를 하고, 썸네일용 이미지는 width가 468이, height는 width에 맞춰서 조정되도록

interface Props {
  photoUrls: string[]
  boardId: number
}

export default function PhotoViewer({ photoUrls, boardId }: Props) {
  const length = photoUrls.length
  const lengthArray = Array.from({ length: length }, (_, i) => i + 1)

  const [images, setImages] = useState<string[] | null>(null)
  const [load, setLoad] = useState(false)
  const getPhotoUrls = useCallback(async (photoUrls: string[]) => {
    const [keyW, keyX, keyY, keyZ] = photoUrls.slice(0, 4)

    const kw = keyW ? `&kw=${keyW}` : ''
    const kx = keyX ? `&kx=${keyX}` : ''
    const ky = keyY ? `&ky=${keyY}` : ''
    const kz = keyZ ? `&kz=${keyZ}` : ''

    if (!kw) return

    try {
      const res = await fetch(checkEnvironment().concat(`/api/board/photo?boardId=${boardId}${kw}${kx}${ky}${kz}`), {
        method: 'GET',
        cache: 'no-store',
      })
      if (res.status === 200) {
        const { signatureUrls } = await res.json()
        setImages(signatureUrls)
      } else {
        const data = await res.json()
        console.log(data)
        return
      }
    } catch (error) {
      console.log('error:', error)
      return
    } finally {
      setLoad(false)
    }
  }, [])

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)

  useEffect(() => {
    function updateViewportHeight() {
      setViewportHeight(window.innerHeight)
    }

    window.addEventListener('resize', updateViewportHeight)

    return () => {
      window.removeEventListener('resize', updateViewportHeight)
    }
  }, [])

  useEffect(() => {
    if (load) {
      getPhotoUrls(photoUrls)
    }
  }, [load])

  useEffect(() => {
    if (!images) {
      setLoad(true)
    }
  }, [images])

  useEffect(() => {
    return () => {
      setImages(null)
    }
  }, [])

  return (
    <div className="flex-row h-auto w-full max-w-[430px] md:max-w-[374px]">
      <div
        className={`bg-white ${length > 1 ? 'grid grid-cols-2 gap-[3px]' : 'grid'} ${
          length > 2 ? 'gird-rows-2' : length === 2 && 'grid-rows-1'
        } h-auto w-full rounded-[15px] overflow-hidden`}
      >
        {images
          ? images.map((image, i) => (
              <div
                key={i}
                className={`cursor-pointer relative ${
                  length === 3 && i === 0 ? 'row-start-1 row-end-3 h-[calc(30vh+3px)]' : length === 2 ? 'h-[30vh]' : length === 1 ? 'h-full' : 'h-[15vh]'
                }`}
              >
                <Image
                  src={image}
                  alt="_blank"
                  width={430}
                  height={viewportHeight * 0.3}
                  priority
                  className="relative w-full h-full object-cover max-h-[500px]"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89x8AAuEB74Y0o2cAAAAASUVORK5CYII="
                />
              </div>
            ))
          : lengthArray.map((i) => (
              <div
                key={i}
                className={`bg-gray-1 w-full ${
                  length === 3 && i === 0 ? 'row-start-1 row-end-3 h-full' : length === 2 ? 'h-[30vh]' : length === 1 ? 'h-[30vh]' : 'h-[15vh]'
                }`}
              />
            ))}
      </div>
    </div>
  )
}
