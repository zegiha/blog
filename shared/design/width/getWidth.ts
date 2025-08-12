import TWidth from '@/shared/design/width/TWidth'
import {CSSProperties} from 'react'

export default function getWidth(width: TWidth): CSSProperties {
  switch(width) {
    case 'fill-flex': return {
      flex: 1,
    }
    case 'fill-width': return {
      width: '100%',
    }
    case 'auto': return {
      width: undefined,
    }
    case 'hug': return {
      width: 'fit-content',
    }
    default: {
      if(
        width === undefined ||
        width === 'undefined'
      ) {
        return {}
      } else {
        return {
          width: width
        }
      }
    }
  }
}