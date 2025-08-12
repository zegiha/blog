import {Ref, useEffect, useRef} from 'react'

/**
 * 요소가 뷰포트에 특정 비율 이상 보일 때 콜백을 실행하는 훅
 * @param callback 요소가 보일 때 실행할 콜백 함수
 * @param threshold 요소가 보여야 하는 비율 (0.0 ~ 1.0)
 * @param rootMargin IntersectionObserver의 rootMargin 값
 * @returns 관찰할 요소에 연결할 ref
 */

export default function useElementObserver<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  threshold: number = 0.3,
  rootMargin: string = '0px'
): Ref<T> {
  const elementRef = useRef<T>(null)


  useEffect(() => {
    const currentElement = elementRef.current
    if (!currentElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 요소가 threshold 이상 보이면 콜백 실행
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            callback()
          }
        })
      },
      {
        threshold, // 30%가 보일 때 감지
        rootMargin, // 기본값은 0px
      }
    )

    observer.observe(currentElement)

    // 클린업 함수
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [callback, threshold, rootMargin])

  return elementRef
}