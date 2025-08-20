import {IRenewMediaValue, TNullableRenewMediaValue} from '@/components/_chan/renew/()/type'

export interface IMedia {
  type: 'image'
  url: string
  alt?: string
  position: IRenewMediaValue['position']
  setValue: (v: TNullableRenewMediaValue) => void
}