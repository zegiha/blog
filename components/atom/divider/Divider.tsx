import cn from 'classnames'
import linear from './linear.module.css'
import circular from './circular.module.css'
import defaultStyle from './style.module.css'

interface IDivider {
  type?: 'linear' | 'circular'
  hierarchy?: 'normal' | 'alternative'
  size?: 'small' | 'medium' | 'large'
}

export default function Divider({
  type='linear',
  hierarchy='normal',
  size='medium',
}: IDivider) {
  const style = type === 'linear' ? linear : circular

  return (
    <div className={cn(
      defaultStyle[hierarchy],
      style[size],
    )} />
  )
}