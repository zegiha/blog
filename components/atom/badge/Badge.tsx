import Typo from '@/components/atom/typo/Typo'
import cn from 'classnames'
import style from './style.module.css'
import interactionStyle from '@/shared/design/interaction/interaction.module.css'

interface IBadge {
  size: 'small' | 'medium'
  children: string
  onClick?: () => void
}

export default function Badge({
  size,
  children,
  onClick,
}: IBadge) {
  return (
    <div className={cn(interactionStyle.interaction, style.container)} onClick={onClick}>
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