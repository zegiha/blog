import {IRenewMediaValue} from '@/components/_chan/renew/()/type'

export interface IAlignIconButton {
  isActive: boolean
  imageAlign: 'start' | 'center' | 'end'
  changePosition: (v: IRenewMediaValue['position']) => void
}