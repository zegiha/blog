import {RefObject, useEffect, useRef, useState} from 'react'

export default function useHover<T>(refParam?: RefObject<T>) {
  const ref = refParam || useRef<T | null>(null)

  const [hover, setHover] = useState(false)

  useEffect(() => {
    if(
      !ref ||
      !ref.current ||
      !(ref.current instanceof HTMLElement)
    ) return

    const handleMouseEnter = () => {
      setHover(true)
    }

    const handleMouseLeave = () => {
      setHover(false)
    }

    ref.current.addEventListener('mouseenter', handleMouseEnter)
    ref.current.addEventListener('mouseleave', handleMouseLeave)
  }, []);

  return {
    hover,
    ref
  }
}