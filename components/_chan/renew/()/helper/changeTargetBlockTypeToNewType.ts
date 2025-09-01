import {IRenewSuper} from '@/components/_chan/renew/()/type'
import {TArticleContentType} from '@/widget/article/create/[id]/bodySection/BodySection'
import {renewDefaultTextData, renewDefaultMediaData} from '@/components/_chan/renew/()/const'

export default function changeTargetBlockTypeToNewType(
  newType: TArticleContentType,
  idx: IRenewSuper['idx'],
  setValue: IRenewSuper['setValue'],
  setAutoFocusIdx: IRenewSuper['setAutoFocusIdx'],
  saveData?: boolean
) {
  setValue(p => {
    if(newType === p[idx].type) return [...p]

    if(
      saveData &&
      newType !== 'image' &&
      p[idx].type !== 'image'
    ) {
      return ([
        ...p.slice(0, idx),
        {...p[idx], type: newType},
        ...p.slice(idx + 1),
      ])
    }

    if(newType === 'image') {
      return ([
        ...p.slice(0, idx),
        {...renewDefaultMediaData, type: newType},
        ...p.slice(idx + 1),
      ])
    } else {
      return ([
        ...p.slice(0, idx),
        {...renewDefaultTextData, type: newType},
        ...p.slice(idx + 1),
      ])
    }
  })

  setTimeout(() => {
    setAutoFocusIdx(idx)
  }, 100)
}