import {IRenewSuper} from '@/components/_chan/renew/()/type'

export default function deleteTargetBlock(
  idx: IRenewSuper['idx'],
  setAutoFocusIdx: IRenewSuper['setAutoFocusIdx'],
  setValue: IRenewSuper['setValue'],
) {
  setValue((p) => (
    p.length === 1 ? [...p] :
    [
    ...p.slice(0, idx),
    ...p.slice(idx + 1)
    ]
  ))
  setAutoFocusIdx(Math.max(idx-1, 0))
}