import {IRenew} from '@/components/_chan/renew/()/type'
import ValueTypeMedia from '@/components/_chan/renew/valueTypeMedia/ValueTypeMedia'
import ValueTypeText from '@/components/_chan/renew/valueTypeText/ValueTypeText'

export default function Renew(props: IRenew) {
  return props.type !== 'image' ? (
    <ValueTypeText {...props}/>
  ):(
    <ValueTypeMedia {...props}/>
  )
}
