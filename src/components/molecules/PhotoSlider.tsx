'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Node<T> = {
  index: number
  url: T
  next: Node<T> | null
}

// const node1: Node<string> = { index: 0, url: '/images/yujin_login.jpeg', next: null }
// const node2: Node<string> = { index: 1, url: '/images/gaeul_login_.jpeg', next: null }
// const node3: Node<string> = { index: 2, url: '/images/rei_login.jpeg', next: null }
// const node4: Node<string> = { index: 3, url: '/images/wonyoung_login.jpeg', next: null }
// const node5: Node<string> = { index: 4, url: '/images/liz_login_.jpeg', next: null }
// const node6: Node<string> = { index: 5, url: '/images/leeseo_login.jpeg', next: null }
// const node7: Node<string> = { index: 6, url: '/images/yujin_login.jpeg', next: null }

// node1.next = node2
// node2.next = node3
// node3.next = node4
// node4.next = node5
// node5.next = node6
// node6.next = node7
// node7.next = node1

// const nodeList = [node1, node2, node3, node4, node5, node6, node7]

const alts = ['yujin', 'gaeul', 'rei', 'wonyo', 'liz', 'leeseo', 'yujin']

export default function PhotoSlider() {
  // const [currentNode, setCurrentNode] = useState<Node<string> | null>(node1)
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

    // const interval = setInterval(() => {
    //   setCurrentNode((cur) => cur && cur.next)
    // }, 3000)

    return () => {
      window.removeEventListener('resize', handleResize)
      // clearInterval(interval)
    }
  }, [])

  const imageUrls = [
    '/images/yujin_login.jpeg',
    '/images/gaeul_login_.jpeg',
    '/images/rei_login.jpeg',
    '/images/wonyoung_login.jpeg',
    '/images/liz_login_.jpeg',
    '/images/leeseo_login.jpeg',
    '/images/yujin_login.jpeg',
  ]

  // 1부터 6까지의 랜덤한 숫자 생성
  const randomIndex = Math.floor(Math.random() * 6) + 1

  return (
    <div className="relative overflow-hidden h-[100vh]">
      {isWideViewport ? (
        <div>하하</div>
      ) : (
        // <div className={`absolute top-0 left-0 ${currentNode && currentNode.index === 0 ? 'transition-none' : 'transition-transform'} duration-500`}>
        <div className={`absolute top-0 left-0`}>
          {/* {nodeList.map((node, index) => (
            <div key={index} className="relative float-left h-[100vh] w-[100vw]"> */}
          <div className="relative float-left h-[100vh] w-[100vw]">
            {randomIndex && (
              <Image
                alt={alts[randomIndex]}
                src={imageUrls[randomIndex]}
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
            )}
          </div>
          {/* ))} */}
        </div>
      )}
    </div>
  )
}
