'use client'

import { useEffect, useRef, useState } from 'react'

export default function useObserver(
  prevData: any[] | null,
  getPost: (boardType: string, url: string) => any,
  totalPages: number,
  next: number,
  boardType: string,
  userId: number | undefined,
) {
  const target = useRef<HTMLDivElement>(null)
  const [promise, setPromise] = useState<string | null>(null)
  const [postData, setPostData] = useState<any[] | null>(prevData ? [...prevData] : null)
  const [nextPageIndex, setPageIndex] = useState(2)
  const [total, setTotal] = useState(totalPages)
  const [req, setReq] = useState(next)
  const [isLastPage, setLastPage] = useState(false)

  const fetchData = async () => {
    const url =
      boardType === 'forum'
        ? `/api/board/forum?pageIndex=${nextPageIndex}&req=${req}&total=${total}`
        : boardType === 'photo'
        ? `/api/board/photo?pageIndex=${nextPageIndex}&userId=${userId}`
        : `/api/board/video?pageIndex=${nextPageIndex}&userId=${userId}`

    try {
      setPromise('pending')
      if (boardType === 'forum') {
        const { posts, totalPages, isLastPage, next } = await getPost(boardType, url)
        setPostData((prev) => {
          if (prev) {
            return [...prev, ...posts]
          } else {
            return [...posts]
          }
        })
        setTotal(totalPages)
        setReq(next)
        setLastPage(isLastPage)
        setPromise('fulfilled')
        setPageIndex(nextPageIndex + 1)
      }
    } catch (error) {
      setPromise('rejected')
    }
  }

  useEffect(() => {
    let observer: IntersectionObserver
    if (target) {
      observer = new IntersectionObserver(
        async ([e], observer) => {
          if (e.isIntersecting) {
            observer.unobserve(e.target)
            await fetchData()
            observer.observe(e.target)
          }
        },
        { threshold: 0.9 },
      )
      observer.observe(target.current as Element)
    }
    return () => observer.disconnect()
  }, [target])

  return { target, postData, promise, setPromise, isLastPage }
}
