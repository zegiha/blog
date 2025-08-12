'use client'

import {TDragHoverPosition} from '@/shared/hook/dragAndDrop/type'
import {IUseDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/type'
import {getNewData} from '@/shared/hook/dragAndDrop/useDragAndDropContainer/helper'
import {IUseDragAndDropContainer} from '@/shared/hook/dragAndDrop/useDragAndDropContainer/type'
import useClone from '@/shared/hook/dragAndDrop/useClone/useClone'
import React, {Dispatch, RefObject, SetStateAction, useCallback, useEffect, useState} from 'react'

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
  }, [dragTargetIdx])

  const onDragged = useCallback((
    idx: number,
    position: TDragHoverPosition
  ) => {
    if(dragTargetIdx === null) return
    if(dragHoverIdx === idx && dragHoverPosition === position) return

    setDragHoverIdx(idx)
    setDragHoverPosition(position)
  }, [data, dragTargetIdx, dragHoverIdx, dragHoverPosition])

  const onTargetDropped = useCallback(() => {
    if(dragTargetIdx === null) return

    clearClone()

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
  }, [dragTargetIdx, dragHoverIdx, dragHoverPosition, data, setData])

  useEffect(() => {
    document.body.addEventListener('mouseup', onTargetDropped)

    return () => {
      document.body.removeEventListener('mouseup', onTargetDropped)
    }
  }, [onTargetDropped, onDragged]);

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
      isTarget: getIsTarget(idx),
      isHoverAndPosition: getIsHoverAndPosition(idx),
    }
  }, [onTargeted, onDragged, onTargetDropped])

  return {
    getDragProps,
  }
}