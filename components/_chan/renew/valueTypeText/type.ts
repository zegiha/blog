import {IRenewSuper, IRenewTextValue} from '@/components/_chan/renew/()/type'

export interface IValueTypeText
  extends IRenewTextValue, Omit<IRenewSuper, 'useDragAndDropParam'> {
}