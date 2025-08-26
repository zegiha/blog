import getTopMarginDimensionByContentType from '@/components/_chan/renew/()/renewWrapper/helper'
import useRenewWrapper from '@/components/_chan/renew/()/renewWrapper/useRenewWrapper'
import ControlSection from '@/components/_chan/renew/controlSection/ControlSection'
import {IRenew} from '@/components/_chan/renew/()/type'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import cn from 'classnames'
import {ReactNode} from 'react'
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

  return (
    <>
      <Col
        ref={(el) => {
          dragAndDropTargetRef.current = el
          setContainerRef(el)
        }}
        className={style.container}
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
            show={hover}
            contentType={type}
            onDragButtonDrag={onDragStart}
            onAddButtonClick={() =>
              addNewBlock(idx, setAutoFocusIdx, setValue)}
          />
        </Row>
      </Col>
      {props.sibling && props.sibling}
    </>
  )
}

export default RenewWrapper
