import React, {RefObject} from 'react'

type TDragHoverPosition = 'top' | 'bottom'

interface IDragEvents {
  onTargeted: (idx: number, targetRef: RefObject<HTMLDivElement | null>, e: React.MouseEvent) => void,
  onDragged: (idx: number, position: TDragHoverPosition) => void,
  onTargetDropped: () => void,
}

export type {
  TDragHoverPosition,
  IDragEvents,
}