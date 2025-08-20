'use client'

import Col from '@/components/atom/flex/Col'
import EditableImage from '@/components/molecule/editableDiv/EditableImage'
import getWidth from '@/shared/design/width/getWidth'
import {useDragAndDrop} from '@/shared/hook/dragAndDrop/useDragAndDrop/useDragAndDrop'
import cn from 'classnames'
import {useState, useEffect} from 'react'
import textSizeStyle from '@/shared/design/text/textSize.module.css'
import textWeightStyle from '@/shared/design/text/textWeight.module.css'
import textColorStyle from '@/shared/design/text/textColor.module.css'
import style from './style.module.css'
import OptionModal from "@/components/molecule/optionModal/OptionModal";
import {useOptionModal} from './hooks/useOptionModal'
import {useControlSection} from './hooks/useControlSection'
import ControlSection from './ControlSection'
import BlockTypeSelector from './BlockTypeSelector'
import EditableText from './EditableText'
import {EditableDivProps} from './types'
import Row from "@/components/atom/flex/Row";
import {List} from "@/components/atom/icon";


export default function EditableDiv(props: EditableDivProps) {
  const {
    width,
    textSize,
    accent,
    color,
    placeholder: placeholderProps,
    showPlaceholderAlways = false,
    content,
    setContent,
    controllable = true,
    autoFocus = false,
    onAddButtonClick = () => {
      throw new Error('onAddButtonClick is not defined when controllable is false')
    },
    contentType,
    onContentTypeChange = () => {
    }
  } = props

  const isControllable = controllable && !(textSize || accent || color)
  const placeholder = placeholderProps === '\default' ? '내용 입력하기, /로 명령어 입력하기' : placeholderProps

  const {optionModalOpen, setOptionModalOpen, optionData, getOptionTypeFromCommand} = useOptionModal(props)
  const {containerRef, showControlSection} = useControlSection({optionModalOpen})

  const {ref, onTargetMouseDown} = useDragAndDrop(props.dragProps)

  return (
    <>
      <Col
        ref={(el) => {
          ref.current = el
        }}
        width={'fill-flex'}
        style={{position: 'relative', zIndex: 0}}
      >
        <Row ref={(el) => {
          containerRef.current = el
        }} alignItems={'center'} style={getWidth(width)}>
          <Row className={cn(style[contentType ?? 'none'], style.contentAndPlaceholderWrapper)}>
            {contentType === 'list' && <List
                color={'var(--label-normal)'}
                fill={'var(--label-normal)'}
                width={24}
                height={24}
            />}
            {contentType !== 'image' ? (
              <EditableText
                content={content}
                setContent={setContent}
                textSize={textSize}
                accent={accent}
                color={color}
                placeholder={placeholder}
                showPlaceholderAlways={showPlaceholderAlways}
                autoFocus={autoFocus}
                contentType={contentType}
                onContentTypeChange={onContentTypeChange}
                allowLineBreak={props.allowLineBreak}
                onAddButtonClick={onAddButtonClick}
                onDeleteBlock={props.onDeleteBlock}
                clearAutoFocus={props.clearAutoFocus}
                optionModalOpen={optionModalOpen}
                controllable={isControllable}
                onOptionModalEntered={() => {
                  const optionType = getOptionTypeFromCommand(content.trim())
                  if (optionType) {
                    onContentTypeChange(optionType)
                    setContent('')
                    setOptionModalOpen(false)
                  }
                }}
              />
            ):(
              <EditableImage
                content={''}
                setContent={() => {}}
              />
            )}
            {isControllable && (
              <ControlSection
                showControlSection={showControlSection}
                onDragButtonDown={onTargetMouseDown}
                onDragButtonRightDown={() => {setOptionModalOpen(true)}}
                onAddButtonClick={onAddButtonClick}
                contentType={contentType}
              />
            )}
          </Row>
        </Row>
      </Col>
      <OptionModal.modal
        open={optionModalOpen && controllable}
        onClose={() => setOptionModalOpen(false)}
        style={{
          width: 160,
          y: `calc(${containerRef.current?.getBoundingClientRect().height}px + ${ref.current?.offsetTop}px + 4px)`,
        }}
      >
        <BlockTypeSelector
          optionData={optionData}
          onContentTypeChange={(type) => {
            onContentTypeChange(type)
            setContent('')
            setOptionModalOpen(false)
          }}
        />
      </OptionModal.modal>
    </>
  )
}
