import Typo from '@/components/atom/typo/Typo'
import style from './style.module.css'

interface IBadge {
  size: 'small' | 'medium'
  children: string
}

export default function Badge({
  size,
  children
}: IBadge) {
  return (
    <div className={style.container}>
      <BadgeTypo size={size}>
        {children}
      </BadgeTypo>
    </div>
  )
}

function BadgeTypo({
  size,
  children
}: IBadge) {
  switch(size) {
    case 'small': return <Typo.xsmall>
      {children}
    </Typo.xsmall>
    case 'medium': return <Typo.small>
      {children}
    </Typo.small>
  }
}