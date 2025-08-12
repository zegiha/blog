import {IUseDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/type'

const defaultIUseDragAndDrop: IUseDragAndDrop = {
  idx: 0,
  isTarget: false,
  isHoverAndPosition: false,
  onTargeted: () => {},
  onDragged: () => {},
  onTargetDropped: () => {},
}

export {
  defaultIUseDragAndDrop,
}