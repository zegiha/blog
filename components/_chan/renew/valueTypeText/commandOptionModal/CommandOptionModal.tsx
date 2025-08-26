import iconAndLabel from '@/components/_chan/renew/valueTypeText/commandOptionModal/const/iconAndLabel'
import {ICommandOptionModal} from '@/components/_chan/renew/valueTypeText/commandOptionModal/type'
import useCommandOptionModal from '@/components/_chan/renew/valueTypeText/commandOptionModal/useCommandOptionModal'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import Typo from '@/components/atom/typo/Typo'
import OptionModal from '@/components/molecule/optionModal/OptionModal'
import interactionStyle from '@/shared/design/interaction/interaction.module.css'
import cn from 'classnames'
import style from './style.module.css'
import handleKeyDown from '@/components/_chan/renew/valueTypeText/commandOptionModal/helper/handleKeyDown'

export default function CommandOptionModal(props: ICommandOptionModal) {
  const {
    style: propsStyle,
  } = props
  const {
    open,
    onClose,
    optionData,
    changeContentType,
    firstOptionRef,
  } = useCommandOptionModal(props)

  return (
    <OptionModal.modal
      open={open}
      onClose={onClose}
      style={propsStyle}
    >
      <Col
        width={'fill-flex'}
        className={style.list}
        onKeyDown={handleKeyDown}
        // tabIndex={0}
      >
        {optionData.map((v, i) => (
          <Row
            ref={(el) => {
              if(el === null) return
              if(i === 0) firstOptionRef.current = el
            }}
            key={i}
            className={cn(
              interactionStyle.interaction,
              style.item
            )}
            gap={6}
            alignItems={'center'}
            tabIndex={i}
            onClick={() => changeContentType(v)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && open) {
                e.preventDefault()
                changeContentType(v)
              } else if(e.key === ' ' && open) {
                onClose()
              }
            }}
          >
            {iconAndLabel[v].icon}
            <Typo.medium>
              {iconAndLabel[v].label}
            </Typo.medium>
          </Row>
        ))}
        {optionData.length === 0 && (
          <Row width={'fill-width'} className={style.empty}>
            <Typo.medium width={'fill-width'}>
              별도의 블록을 찾지 못했어요
            </Typo.medium>
          </Row>
        )}
      </Col>
    </OptionModal.modal>
  )
}