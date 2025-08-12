'use client'

import FadeInAndOut from '@/components/atom/fadeInAndOut/FadeInAndOut'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import Typo from '@/components/atom/typo/Typo'
import {IOptionModal} from '@/components/molecule/optionModal/type'
import useOptionModal from '@/components/molecule/optionModal/useOptionModal'
import {ReactNode} from 'react'
import style from './style.module.css'

function OptionModalAnchor({ children }: { children?: ReactNode }) {
  return <div className={style.floatingWrapper}>{children}</div>
}

function OptionModalComponent({
 open,
 onClose,
 // style: styleProps,
  style: modalStyle,
 children,
}: IOptionModal) {
  const ref = useOptionModal({
    open,
    onClose,
    style: modalStyle,
  })

  return (
    <FadeInAndOut
      show={open}
      animation={{
        duration: '0.24s',
        fadeInClass: style.fadeIn,
        fadeOutClass: style.fadeOut,
      }}
    >
      <Col
        ref={ref}
        className={style.container}
        // style={styleProps}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <Row width={'fill-width'} justifyContent={'flex-end'}>
          <Typo.xxsmall color={'alternative'}>
            esc로 닫기
          </Typo.xxsmall>
        </Row>
      </Col>
    </FadeInAndOut>
  )
}

const OptionModal = {
  anchor: OptionModalAnchor,
  modal: OptionModalComponent
}

export default OptionModal