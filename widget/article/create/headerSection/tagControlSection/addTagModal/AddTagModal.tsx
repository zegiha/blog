'use client'

import Divider from '@/components/atom/divider/Divider'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import {TextButton} from '@/components/atom/textButton/TextButton'
import Typo from '@/components/atom/typo/Typo'
import getWidth from '@/shared/design/width/getWidth'
import TWidth from '@/shared/design/width/TWidth'
import {Add} from '@/components/atom/icon'
import cn from 'classnames'
import {useState} from 'react'
import OptionModal from '@/components/molecule/optionModal/OptionModal'
import Istyle from './input.module.css'
import style from './style.module.css'
import interactionStyle from '@/shared/design/interaction/interaction.module.css'

export default function AddTagModal({
  addTag
}: {
  addTag: (tag: string) => void,
}) {
  const [optionModalOpen, setOptionModalOpen] = useState<boolean>(false)
  const [tagName, setTagName] = useState<string>('')
  const [existingTags, setExistingTags] = useState<Array<string>>(['test', 'test2'])

  const addTagHandler = () => {
    addTag(tagName)
    setTagName('')
    setOptionModalOpen(false)
  }

  return (
    <OptionModal.anchor>
      <TextButton
        leadingIcon={'plus'}
        label={'태그 추가'}
        onClick={() => {
          setOptionModalOpen((p) => !p)
        }}
      />
      <OptionModal.modal
        open={optionModalOpen}
        onClose={() => {
          setOptionModalOpen(false)
        }}
        style={{
          width: 160,
          maxHeight: 240,
          y: 'calc(100% + 8px)'
        }}
      >
        <Col className={style.listContainer} gap={8}>
          <Input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            size={'small'}
            width={'fill-width'}
            onTrailIconButtonClick={addTagHandler}
            onEnter={addTagHandler}
          />
          {existingTags.length > 0 && (
            <>
              <Divider/>
              <Col className={style.list} width={'fill-width'} gap={0}>
                {existingTags.map((v, i) => (
                  <ExistingTag
                    key={i}
                    content={v}
                    onClick={() => {
                      addTag(v)
                      setTagName('')
                      setOptionModalOpen(false)
                    }}
                  />
                ))}
              </Col>
            </>
          )}
        </Col>
      </OptionModal.modal>
    </OptionModal.anchor>
  )
}

function ExistingTag({
  content,
  onClick,
}: {
  content: string
  onClick: () => void,
}) {
  return (
    <Row
      className={cn(
      interactionStyle.interaction,
      style.existingTag
      )}
      onClick={onClick}
    >
      <Typo.small>{content}</Typo.small>
    </Row>
  )
}

function Input({
  value,
  onChange,
  size,
  width,
  onTrailIconButtonClick,
  onEnter,
}: {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  size: 'small' | 'medium',
  width?: TWidth,
  onTrailIconButtonClick?: () => void,
  onEnter?: () => void,
}) {
  const [focus, setFocus] = useState<boolean>(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter()
    }
  }

  return (
    <Row
      className={cn(
        Istyle.inputWrapper,
        Istyle[size + 'Size'],
        focus && Istyle.inputWrapperFocus,
      )}
    >
      <input
        type='text'
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={handleKeyDown}
        className={cn(
          Istyle.input,
        )}
        style={{
          ...getWidth(width),
        }}
      />
      <Row gap={8}>
        <span
          className={cn(
            interactionStyle.interaction,
            Istyle.trailButton
          )}
          onClick={onTrailIconButtonClick}
        >
          <Add
            width={20}
            height={20}
            fill={'var(--label-alternative)'}
            color={'var(--label-alternative)'}
          />
        </span>
      </Row>
    </Row>
  )
}
