import {ReactNode} from 'react'

interface IUseOptionModal {
  open: boolean
  onClose: () => void
  style?: {
    width?: string | number
    height?: string | number
    maxWidth?: string | number
    maxHeight?: string | number
    minWidth?: string | number
    minHeight?: string | number
    x?: string | number
    y?: string | number
    // position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    // gap?: string | number
  }
}

interface IOptionModal extends IUseOptionModal {
  // style?: CSSProperties
  children?: ReactNode
}

export type {
  IOptionModal,
  IUseOptionModal,
}
