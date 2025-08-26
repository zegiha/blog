'use client'

import Col from '@/components/atom/flex/Col'
import style from './style.module.css'

export default function() {
  return (
    // data-content-editable-selecting={true}
    <div  className={style.test} style={{display: 'flex', flexDirection: 'column', gap: 24}}>
      <div className={style.test} contentEditable content-editable-leaf="true">abc</div>
      <div className={style.test}   contentEditable content-editable-leaf="true">123</div>
    </div>
  )
}