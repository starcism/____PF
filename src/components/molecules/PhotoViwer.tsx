'use client'

import checkEnvironment from '@/libs/checkEnvironment'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'

//그렇다면 일반적인 서비스에서 허용하는 확장자를 포함해서 유효성 검사를 하고, 썸네일용 이미지는 width가 468이, height는 width에 맞춰서 조정되도록

interface Props {
  photoUrls: string[]
}

export default function PhotoViewer({ photoUrls = [] }: Props) {
  const length = photoUrls.length
  const lengthArray = Array.from({ length }, (_, i) => i)
  const [images, setImages] = useState<string[] | null>()
  const [load, setLoad] = useState(false)
  const getPhotoUrls = useCallback(async (photoUrls: string[]) => {
    const [keyW, keyX, keyY, keyZ] = photoUrls.slice(0, 4)

    const kw = keyW ? `kw=${keyW}` : ''
    const kx = keyX ? `&kx=${keyX}` : ''
    const ky = keyY ? `&ky=${keyY}` : ''
    const kz = keyZ ? `&kz=${keyZ}` : ''

    if (!kw) return

    try {
      const res = await fetch(checkEnvironment().concat(`/api/board/photo?${kw}${kx}${ky}${kz}`), {
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

  return (
    <div className="flex-row px-[34px] h-auto w-screen">
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
                  length === 3 && i === 0 ? 'row-start-1 row-end-3 h-[30vh]' : length === 2 ? 'h-[30vh]' : length === 1 ? 'h-full' : 'h-[15vh]'
                }`}
              >
                <Image
                  src={image}
                  alt="_blank"
                  fill
                  className="relative w-full h-full object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89x8AAuEB74Y0o2cAAAAASUVORK5CYII="
                />
              </div>
            ))
          : lengthArray.map((i) => (
              <div
                key={i}
                className={`bg-gray-1 ${
                  length === 3 && i === 0 ? 'row-start-1 row-end-3 h-full' : length === 2 ? 'h-[30vh]' : length === 1 ? 'h-full' : 'h-[15vh]'
                }`}
              />
            ))}
      </div>
    </div>
  )
}
