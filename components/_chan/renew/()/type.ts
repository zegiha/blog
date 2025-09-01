import {IUseDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/type'
import {TArticleContentType} from '@/widget/article/create/[id]/bodySection/BodySection'
import {Dispatch, SetStateAction} from 'react'

export type TRenewTextValueStyle = {
  color?: string
  accent?: boolean
  underline?: boolean
  italic?: boolean
}

export interface IRenewTextValue {
  type: Exclude<TArticleContentType, 'image'>
  value: Array<{
    content: string
  } & TRenewTextValueStyle>
  // setValue: Dispatch<SetStateAction<Array<{
  //   content: string
  //   color?: string
  //   accent?: boolean
  //   underline?: boolean
  //   italic?: boolean
  // }>>>
}

export interface IRenewMediaValue {
  type: 'image'
  src: string | null
  position: 'start' | 'center' | 'end'
  alt?: string
  width?: string
}

export type TNullableRenewMediaValue =
  {[K in keyof IRenewMediaValue]?: IRenewMediaValue[K]}

export interface IRenewSuper {
  idx: number
  useDragAndDropParam: IUseDragAndDrop
  setValue: Dispatch<SetStateAction<Array<IRenewTextValue | IRenewMediaValue>>>
  autoFocus: boolean
  setAutoFocusIdx: Dispatch<SetStateAction<number | null>>
  // changeFocus: (v: number | null) => void
}

export type IRenew = IRenewSuper & (IRenewTextValue | IRenewMediaValue)
