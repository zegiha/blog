import changeTargetBlockTypeToNewType from '@/components/_chan/renew/()/helper/changeTargetBlockTypeToNewType'
import deleteTargetBlock from '@/components/_chan/renew/()/helper/deleteTargetBlock'
import getTopMarginDimensionByContentType from '@/components/_chan/renew/()/renewWrapper/helper'
import OptionControl from '@/components/_chan/renew/()/renewWrapper/optionControl/OptionControl'
import useRenewWrapper from '@/components/_chan/renew/()/renewWrapper/useRenewWrapper'
import ControlSection from '@/components/_chan/renew/()/renewWrapper/controlSection/ControlSection'
import {IRenew} from '@/components/_chan/renew/()/type'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import cn from 'classnames'
import {ReactNode, useState} from 'react'
import style from '../style.module.css'
import addNewBlock from '@/components/_chan/renew/()/helper/addNewBlock'

function RenewWrapper(
  props: IRenew &
    {
      children?: ReactNode,
      sibling?: ReactNode,
      hookValue: ReturnType<typeof useRenewWrapper>,
    }) {
  const {
    idx,
    type,
    setValue,
    setAutoFocusIdx,
    hookValue: {
      dragAndDropTargetRef,
      setContainerRef,
      wrapperRef,
      hover,
      onDragStart,
    }
  } = props

  const [optionControlOpen, setOptionControlOpen] = useState<boolean>(false)

  return (
    <>
      <Col
        ref={(el) => {
          dragAndDropTargetRef.current = el
          setContainerRef(el)
        }}
        className={cn(style.container, type+'Block')}
        width={'fill-flex'}
      >
        <Row
          className={cn(style.wrapper)}
          ref={wrapperRef}
          width={'fill-width'}
          style={{
            marginTop: `${getTopMarginDimensionByContentType(type)}px`
          }}
        >
          {props.children && props.children}
          <ControlSection
            idx={idx}
            show={hover || optionControlOpen}
            contentType={type}
            onDragButtonDrag={(e) => {
              setOptionControlOpen(false)
              onDragStart(e)
            }}
            onAddButtonClick={() => {
              setOptionControlOpen(false)
              addNewBlock(idx, setAutoFocusIdx, setValue)
            }}
            onDragButtonClick={() => {
              setOptionControlOpen(p => !p)
            }}
          />
        </Row>
      </Col>
      {props.sibling && props.sibling}

      <OptionControl
        open={optionControlOpen}
        onClose={() => setOptionControlOpen(false)}
        deleteBlock={() => deleteTargetBlock(idx, setAutoFocusIdx, setValue)}
        changeBlockType={(v) => {
          changeTargetBlockTypeToNewType(v, idx, setValue, setAutoFocusIdx, true)
        }}
      />
    </>
  )
}

export default RenewWrapper
