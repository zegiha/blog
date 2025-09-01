'use client'

import {WithClassName} from '@/components/atom/fadeInAndOut/type'
import cn from 'classnames'
import {cloneElement, isValidElement, ReactElement, ReactNode} from 'react'

export default function enhance(
  child: ReactNode,
  i: number,
  animationClass: string
) {
  if (isValidElement(child)) {
    const el = child as ReactElement<WithClassName>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prevClassName = (child.props as any).className as string
    return cloneElement(el, {
      className: cn(prevClassName, animationClass),

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      key: (child.props as any).key ?? i,
    })
  }
  return (
    <span key={i} className={animationClass} style={{ display: 'contents' }}>
      {child}
    </span>
)
}