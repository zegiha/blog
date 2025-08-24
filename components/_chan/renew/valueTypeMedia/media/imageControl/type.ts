import {IRenewMediaValue, TNullableRenewMediaValue} from '@/components/_chan/renew/()/type'

export interface IImageControl {
  targetRef: React.RefObject<HTMLDivElement | null>
  hover: boolean
  position: IRenewMediaValue['position']
  changeValue: (v: TNullableRenewMediaValue) => void
}