'use client'

import enhance from '@/components/atom/fadeInAndOut/enhance'
import {IFadeInOut} from '@/components/atom/fadeInAndOut/type'
import useFadeInAndOut from '@/components/atom/fadeInAndOut/useFadeInAndOut'
import {Children} from 'react'
import style from './style.module.css'

export default function FadeInAndOut(props: IFadeInOut) {
  const {show, animation, children} = props
  const mount = useFadeInAndOut(props)

  const animationClass = show ? animation?.fadeInClass ?? style.fadeIn : animation?.fadeOutClass ?? style.fadeOut

  if (mount) return (
    <>
      {Children.map(
        children,
        (child, i) =>
          enhance(child, i, animationClass)
      )}
    </>
  )
  return null
}