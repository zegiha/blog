import {IDragEvents, TDragHoverPosition} from '@/shared/hook/dragAndDrop/type'

interface IUseDragAndDrop extends IDragEvents {
  idx: number
  targetIdx: number | null
  isTarget: boolean
  isHoverAndPosition: TDragHoverPosition | false
}

export type {
  IUseDragAndDrop,
}