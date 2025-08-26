'use client'

import {TDragHoverPosition} from '@/shared/hook/dragAndDrop/type'
import {IUseDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/type'
import {getNewData} from '@/shared/hook/dragAndDrop/useDragAndDropContainer/helper'
import {IUseDragAndDropContainer} from '@/shared/hook/dragAndDrop/useDragAndDropContainer/type'
import useClone from '@/shared/hook/dragAndDrop/useClone/useClone'
import React, {Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef, useState} from 'react'

export function useDragAndDropContainer<T>({
  data,
  setData,
}: {
  data: Array<T>
  setData: Dispatch<SetStateAction<Array<T>>>
}): IUseDragAndDropContainer {
  const [dragTargetIdx, setDragTargetIdx] = useState<number | null>(null)
  const [dragHoverIdx, setDragHoverIdx] = useState<number | null>(null)
  const [dragHoverPosition, setDragHoverPosition] = useState<TDragHoverPosition | null>(null)

  // 자동 스크롤 제어용
  const rafIdRef = useRef<number | null>(null)
  const scrollSpeedRef = useRef<number>(0) // +아래, -위
  const isAutoScrollingRef = useRef<boolean>(false)

  const startAutoScroll = useCallback(() => {
    if (isAutoScrollingRef.current) return
    isAutoScrollingRef.current = true

    const step = () => {
      const speed = scrollSpeedRef.current
      if (speed !== 0) {
        window.scrollBy(0, speed)
      }
      rafIdRef.current = requestAnimationFrame(step)
    }

    rafIdRef.current = requestAnimationFrame(step)
  }, [])

  const stopAutoScroll = useCallback(() => {
    isAutoScrollingRef.current = false
    scrollSpeedRef.current = 0
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  const {
    addTargetClone,
    clearClone,
  } = useClone()

  const onTargeted = useCallback((
    idx: number,
    targetRef: RefObject<HTMLDivElement | null>,
    e: React.MouseEvent
  ) => {
    if(
      dragTargetIdx !== null ||
      !targetRef.current
    ) return

    e.preventDefault()

    addTargetClone(targetRef, e)

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'

    setDragTargetIdx(idx)
  }, [dragTargetIdx, addTargetClone])

  const onDragged = useCallback((
    idx: number,
    position: TDragHoverPosition
  ) => {
    if(dragTargetIdx === null) return
    if(dragHoverIdx === idx && dragHoverPosition === position) return

    setDragHoverIdx(idx)
    setDragHoverPosition(position)
  }, [dragTargetIdx, dragHoverIdx, dragHoverPosition])

  const onTargetDropped = useCallback(() => {
    if(dragTargetIdx === null) return

    clearClone()
    stopAutoScroll()

    if(
      dragHoverIdx !== null &&
      dragHoverPosition
    ) {
      setData([...getNewData(
        dragTargetIdx,
        {idx: dragHoverIdx, position: dragHoverPosition},
        data
      )])
    }

    document.body.style.userSelect = ''
    document.body.style.cursor = ''

    setDragTargetIdx(null)
    setDragHoverIdx(null)
    setDragHoverPosition(null)
  }, [dragTargetIdx, dragHoverIdx, dragHoverPosition, data, setData, clearClone, stopAutoScroll])

  const onTargetVerticalEdge = useCallback((e: MouseEvent) => {
    if(dragTargetIdx === null) {
      stopAutoScroll()
      return
    }
    
    const threshold = 128 // 가장자리 감지 범위(px)
    const viewportH = window.innerHeight
    const y = e.clientY

    // 거리 기반 속도 계산 (가까울수록 느리고, 가장자리에 닿을수록 빨라짐)
    const maxSpeed = 24 // 프레임당 px
    let speed

    if (y >= viewportH - threshold) {
      const d = Math.min(threshold, y - (viewportH - threshold))
      const ratio = d / threshold
      speed = Math.ceil(maxSpeed * ratio) // 아래로 +
    } else if (y <= threshold) {
      const d = Math.min(threshold, threshold - y)
      const ratio = d / threshold
      speed = -Math.ceil(maxSpeed * ratio) // 위로 -
    } else {
      speed = 0
    }

    // 문서 상단/하단 도달 시 멈춤
    const atTop = window.scrollY <= 0
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight

    if ((atTop && speed < 0) || (atBottom && speed > 0)) {
      speed = 0
    }

    scrollSpeedRef.current = speed

    if (speed !== 0) {
      startAutoScroll()
    } else {
      // 현재 속도가 0이면 루프만 유지할 필요 없음
      stopAutoScroll()
    }
  }, [dragTargetIdx, startAutoScroll, stopAutoScroll])

  // 전역 이벤트 바인딩: 드랍/이탈/마우스 이동(가장자리 감지)
  useEffect(() => {
    document.body.addEventListener('mouseup', onTargetDropped)
    document.body.addEventListener('mouseleave', onTargetDropped)

    document.addEventListener('mousemove', onTargetVerticalEdge)

    return () => {
      document.body.removeEventListener('mouseup', onTargetDropped)
      document.body.removeEventListener('mouseleave', onTargetDropped)
      document.removeEventListener('mousemove', onTargetVerticalEdge)
    }
  }, [onTargetDropped, onTargetVerticalEdge, dragTargetIdx])

  const getDragProps: (idx: number) => IUseDragAndDrop = useCallback((idx: number) => {
    const getIsTarget = (idx: number) => {
      return idx === dragTargetIdx
    }

    const getIsHoverAndPosition = (idx: number) => {
      if(
        idx === dragHoverIdx &&
        dragHoverPosition !== null
      ) return dragHoverPosition
      return false
    }

    return {
      onTargeted,
      onDragged,
      onTargetDropped,
      idx,
      targetIdx: dragTargetIdx,
      isTarget: getIsTarget(idx),
      isHoverAndPosition: getIsHoverAndPosition(idx),
    }
  }, [onTargeted, onDragged, onTargetDropped, dragTargetIdx, dragHoverIdx, dragHoverPosition])

  return {
    getDragProps,
  }
}