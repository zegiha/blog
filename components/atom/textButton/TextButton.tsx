import Row from '@/components/atom/flex/Row'
import {Add} from '@/components/atom/icon'
import cn from 'classnames'
import {Ref} from 'react'
import Typo from '@/components/atom/typo/Typo'
import style from './style.module.css'
import interactionStyle from '@/shared/design/interaction/interaction.module.css'

export function TextButton({
  ref,
  leadingIcon,
  label,
  onClick,
}: {
  ref?: Ref<HTMLDivElement>
  label: string
  leadingIcon?: 'plus'
  onClick: () => void
}) {
  return (
    <Row ref={ref} className={cn(
      interactionStyle.interaction,
      style.container,
    )} alignItems={'center'} gap={2} onClick={onClick}>
      {leadingIcon && <Add fill={'var(--label-alternative)'} color={'var(--label-alternative)'} width={18} height={18} />}
      <Typo.small color={'alternative'}>{label}</Typo.small>
    </Row>
  )
}
