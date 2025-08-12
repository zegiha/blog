import {IUseDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/type'

interface IUseDragAndDropContainer {
  getDragProps: (idx: number) => IUseDragAndDrop
}

export type {
  IUseDragAndDropContainer,
}