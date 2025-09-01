import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import Delete from '@/components/atom/icon/Delete'
import Widget from '@/components/atom/icon/Widget'
import Typo from '@/components/atom/typo/Typo'
import OptionModal from '@/components/molecule/optionModal/OptionModal'
import {TArticleContentType} from '@/widget/article/create/[id]/bodySection/BodySection'
import cn from 'classnames'
import interactionStyle from '@/shared/design/interaction//interaction.module.css'
import {ReactNode, useState} from 'react'
import style from './style.module.css'
import iconAndLabel from '@/components/_chan/renew/valueTypeText/commandOptionModal/const/iconAndLabel'

enum ItemKey {
  BLOCK = 'block',
  DELETE = 'delete',
}

const itemKey: Array<ItemKey> = Object.values(ItemKey) as Array<ItemKey>

export default function OptionControl({
  open,
  onClose,
  deleteBlock,
  changeBlockType,
}: {
  open: boolean
  onClose: () => void
  deleteBlock: () => void
  changeBlockType: (v: TArticleContentType) => void
}) {
  const [openBlockModal, setOpenBlockModal] = useState<boolean>(false)

  return (
    <OptionModal.modal
      open={open}
      onClose={onClose}
      style={{
        width: 160,
        y: 8,
        x: 0,
      }}
    >
      <Col width={'fill-width'}>
        {itemKey.map((v) => (
          <Button
            key={v}
            className={cn(v === 'delete' && style.deleteButtonContainer)}
            onClick={v === 'block' ?
              () => setOpenBlockModal(p => !p) :
              () => {
                deleteBlock()
                onClose()
            }}
          >
            <ItemProvider itemKey={v}/>
          </Button>
        ))}
      </Col>
      <OptionModal.modal
        open={openBlockModal}
        onClose={() => {
          setOpenBlockModal(false)
        }}
        style={{
          width: 160,
          y: 0,
          x: 'calc(100% + var(--dimension-04)'
        }}
      >
        {(Object.keys(iconAndLabel) as Array<TArticleContentType>).map((v) => (
          <Button
            key={v}
            onClick={() => {
              changeBlockType(v)
              setOpenBlockModal(false)
              onClose()
            }}>
            {iconAndLabel[v].icon}
            <Typo.medium>
              {iconAndLabel[v].label}
            </Typo.medium>
          </Button>
        ))}
      </OptionModal.modal>
    </OptionModal.modal>
  )
}

function Button({
  className,
  onClick,
  children,
}: {
  className?: string,
  onClick: () => void,
  children: ReactNode,
}) {
  return <button
    className={cn(
      interactionStyle.interaction,
      style.buttonContainer,
      className,
    )}
    onClick={onClick}
  >
    <Row width={'fill-width'} gap={6}>
      {children}
    </Row>
  </button>
}

function ItemProvider({
  itemKey,
}: {
  itemKey: ItemKey,
}) {
  switch(itemKey) {
    case ItemKey.BLOCK:
      return <>
        <Widget width={24} height={24} fill={'var(--label-normal)'}/>
        <Typo.medium color={'normal'}>
          블록 형식
        </Typo.medium>
      </>
    case ItemKey.DELETE:
      return <>
        <Delete width={24} height={24} fill={'var(--status-negative)'}/>
        <Typo.medium color={'negative'}>
          제거
        </Typo.medium>
      </>
  }
}