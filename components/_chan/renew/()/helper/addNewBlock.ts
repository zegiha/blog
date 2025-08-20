import {IRenewMediaValue, IRenewSuper, IRenewTextValue} from '@/components/_chan/renew/()/type'
import {renewDefaultData} from '@/components/_chan/renew/()/const'

export default function addNewBlock (
  idx: IRenewSuper['idx'],
  setAutoFocusIdx: IRenewSuper['setAutoFocusIdx'],
  setValue: IRenewSuper['setValue'],
  newData?: IRenewTextValue | IRenewMediaValue
) {
  setValue((p) => {
    const front = [...p.slice(0, idx + 1)]
    const back = [...p.slice(idx + 1)]

    if(newData)
      back.unshift(newData)
    else if(front[idx].type === 'list')
      back.unshift({...renewDefaultData, type: 'list'})
    else
      back.unshift({...renewDefaultData})

    return [
      ...front,
      ...back
    ]
  })
  setAutoFocusIdx(idx + 1)
}