import {ReactNode} from 'react'

interface IUseFadeInOut {
  show: boolean
  animation?: { duration: string; fadeInClass: string; fadeOutClass: string }
  onMount?: () => void
  beforeUnmount?: () => void
  onUnmount?: () => void
}

interface IFadeInOut extends IUseFadeInOut {
  children: ReactNode
}

type WithClassName<T extends object = object> = T & { className?: string }

export type {
  IFadeInOut,
  IUseFadeInOut,
  WithClassName
}