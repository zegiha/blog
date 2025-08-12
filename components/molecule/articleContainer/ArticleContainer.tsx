import Col from '@/components/atom/flex/Col'
import {ReactNode} from 'react'
import style from './style.module.css'

export default function ArticleContainer({
  children
}: {
  children: ReactNode
}) {
  return (
    <Col width={'fill-width'} className={style.container} alignItems={'center'}>
      <Col width={'fill-width'} className={style.wrapper} gap={36}>
        {children}
      </Col>
    </Col>
  )
}