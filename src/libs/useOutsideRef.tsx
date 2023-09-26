import { useEffect, useRef, useState } from 'react'

export default function useOutsideRef<T extends HTMLDivElement = HTMLDivElement>(setToggle: () => void) {
  const ref = useRef<T | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (!isActive) {
          setIsActive(true)
        } else {
          setToggle()
          setIsActive(false)
        }
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isActive])

  return ref
}
