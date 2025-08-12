import getWidth from '@/shared/design/width/getWidth'
import TWidth from '@/shared/design/width/TWidth'
import {CSSProperties, ReactNode, Ref} from 'react'

export interface IFlex {
  ref?: Ref<HTMLDivElement>
  className?: string
  direction?: CSSProperties['flexDirection']
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  gap?: CSSProperties['gap']
  wrap?: boolean
  width?: TWidth
  onTransitionEnd?: () => void
  onClick?: (e: React.MouseEvent) => void
  onMouseDown?: (e: React.MouseEvent) => void
  style?: CSSProperties
  children?: ReactNode
}

export default function Flex({
  ref,
  className,
  direction,
  justifyContent,
  alignItems,
  gap,
  wrap,
  width,
  onTransitionEnd,
  onClick,
  onMouseDown,
  style,
  children,
}: IFlex) {
  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction,
        justifyContent,
        alignItems,
        gap,
        flexWrap: typeof wrap === 'boolean' ? (wrap ? 'wrap' : 'nowrap') : undefined,
        ...getWidth(width),
        ...style,
      }}
      onTransitionEnd={onTransitionEnd}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      {children}
    </div>
  )
}