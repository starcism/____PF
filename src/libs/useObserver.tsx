'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export default function useObserver(
  prevData: any[] | null,
  getPost: (boardType: string, url: string) => any,
  totalPages: number,
  next: number,
  boardType: string,
  userId: number | null,
) {
  const target = useRef<HTMLDivElement>(null)
  const preventRef = useRef(false)
  const [promise, setPromise] = useState<string | null>(null)
  const [postData, setPostData] = useState<any[] | null>(prevData ? [...prevData] : null)
  const [nextPageIndex, setPageIndex] = useState(2)
  const [total, setTotal] = useState(totalPages)
  const [req, setReq] = useState(next)
  const [isLastPage, setLastPage] = useState(false)
  const [url, setUrl] = useState(
    boardType === 'forum'
      ? `/api/board/forum?pageIndex=${nextPageIndex}&req=${req}&total=${total}`
      : boardType === 'photo'
      ? `/api/board/photo?pageIndex=${nextPageIndex}&userId=${userId}&req=${req}&total=${total}`
      : `/api/board/video?pageIndex=${nextPageIndex}&userId=${userId}&req=${req}&total=${total}`,
  )

  const fetchData = useCallback(async () => {
    if (promise !== null && preventRef.current) {
      return
    }
    try {
      setPromise('pending')

      const { posts, totalPages, isLastPage, next } = await getPost(boardType, url)
      setPostData((prev) => {
        if (prev) {
          return [...prev, ...posts]
        } else {
          return [...posts]
        }
      })
      setReq(next)
      setLastPage(isLastPage)
      setPageIndex((prev) => prev + 1)
      setPromise('fulfilled')
    } catch (error) {
      setPromise('rejected')
    }
  }, [url])

  useEffect(() => {
    let observer: IntersectionObserver
    if (target.current && !preventRef.current && !isLastPage) {
      observer = new IntersectionObserver(
        async ([e], observer) => {
          if (e.isIntersecting) {
            observer.unobserve(e.target)
            preventRef.current = true
            await fetchData()
            preventRef.current = false
            observer.observe(e.target)
          }
        },
        { threshold: 0.1 },
      )
      observer.observe(target.current as Element)

      return () => {
        observer.disconnect()
      }
    }
  }, [target, url, isLastPage])

  useEffect(() => {
    if (promise === 'fulfilled') {
      if (boardType === 'forum') {
        setUrl(`/api/board/forum?pageIndex=${nextPageIndex}&req=${req}&total=${total}`)
      } else if (boardType === 'photo') {
        setUrl(`/api/board/photo?pageIndex=${nextPageIndex}&userId=${userId}&req=${req}&total=${total}`)
      } else {
        setUrl(`/api/board/video?pageIndex=${nextPageIndex}&userId=${userId}&req=${req}&total=${total}`)
      }
    }
    if (isLastPage) {
      setUrl('')
    }
  }, [promise, nextPageIndex, req, isLastPage])

  return { target, postData, promise, setPromise, isLastPage }
}
