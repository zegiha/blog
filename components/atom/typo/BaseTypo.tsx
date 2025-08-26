import TTextColor from '@/shared/design/text/TTextColor'
import TTextSize from '@/shared/design/text/TTextSize'
import getWidth from '@/shared/design/width/getWidth'
import TWidth from '@/shared/design/width/TWidth'
import {createElement, Ref} from 'react'
import textSizeStyle from '../../../shared/design/text/textSize.module.css'
import textWeightStyle from '../../../shared/design/text/textWeight.module.css'
import textColorStyle from '../../../shared/design/text/textColor.module.css'
import style from './style.module.css'
import cn from 'classnames'

export interface IBaseTypo {
  ref?: Ref<HTMLElement>
  type: TTextSize
  color?: TTextColor
  accent?: boolean
  width?: TWidth
  textAlign?: 'start' | 'center' | 'end' | 'match-parent'
  noFlexGrow?: boolean
  noFlexShrink?: boolean
  className?: string
  contentEditable?: boolean
  onInput?: (e: React.FormEvent<HTMLElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void
  children?: string
}

export default function BaseTypo({
  ref,
  type,
  color='normal',
  accent,
  width,
  textAlign,
  noFlexGrow=true,
  noFlexShrink=true,
  className,
  contentEditable,
  onInput,
  onFocus,
  onBlur,
  children,
}: IBaseTypo) {
  return createElement(
    getTag(type),
    {
      ref,
      className: cn(
        textSizeStyle[type],
        textColorStyle[color],
        accent ? textWeightStyle.weightAccent : textWeightStyle.weightNormal,
        noFlexGrow && style.noFlexGrow,
        noFlexShrink && style.noFlexShrink,
        className,
      ),
      onInput,
      onFocus,
      onBlur,
      style: {
        ...getWidth(width),
        textAlign,
      },
      contentEditable,
    },
    children
  )
}


function getTag(type: TTextSize) {
  if (type === 'xxxlarge') return 'h1';
  if (type === 'xxlarge') return 'h2';
  if (type === 'xlarge') return 'h3';
  if (['large', 'medium', 'small'].includes(type)) return 'p';
  if (['xsmall', 'xxsmall'].includes(type)) return 'small';
  return 'div'; // 기본값으로 div 반환
}
