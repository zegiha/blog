import {IRenewTextValue} from '@/components/_chan/renew/()/type'
import {IOptionModal} from '@/components/molecule/optionModal/type'
import {TArticleContentType} from '@/widget/article/create/[id]/bodySection/BodySection'
import {CSSProperties} from 'react'

export interface ICommandOptionModal {
  content: IRenewTextValue['value'],
  changeContentType: (type: TArticleContentType) => void,
  style: IOptionModal['style'],
}