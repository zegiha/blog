import {IRenew} from '@/components/_chan/renew/()/type'
import ValueTypeMedia from '@/components/_chan/renew/valueTypeMedia/ValueTypeMedia'
import ValueTypeText from '@/components/_chan/renew/valueTypeText/ValueTypeText'
import {memo} from 'react'

function Renew(props: IRenew) {
  return props.type !== 'image' ? (
    <ValueTypeText {...props}/>
  ):(
    <ValueTypeMedia {...props}/>
  )
}

export default memo(Renew, (p, n) => {
  if (p.type === 'image' && n.type === 'image') return (
    p.src === n.src &&
      p.width === n.width &&
      p.position === n.position &&
      p.alt === n.alt &&
    p.useDragAndDropParam.targetIdx === n.useDragAndDropParam.targetIdx &&
    p.useDragAndDropParam.isHoverAndPosition === n.useDragAndDropParam.isHoverAndPosition
  )
  else if (p.type !== 'image' && n.type !== 'image') return (
    p.type === n.type &&
    p.value.length === n.value.length &&
    p.value.every((item: any, i: number) => {
      const nItem = n.value[i]
      return item.content === nItem.content &&
        item.color === nItem.color &&
        item.accent === nItem.accent &&
        item.underline === nItem.underline &&
        item.italic === nItem.italic
    }) &&
    p.autoFocus === n.autoFocus &&
    p.useDragAndDropParam.targetIdx === n.useDragAndDropParam.targetIdx &&
    p.useDragAndDropParam.isHoverAndPosition === n.useDragAndDropParam.isHoverAndPosition
  )
  return false
})
