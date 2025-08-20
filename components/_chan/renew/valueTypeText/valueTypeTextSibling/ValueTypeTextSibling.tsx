import changeTargetBlockTypeToNewType from '@/components/_chan/renew/()/helper/changeTargetBlockTypeToNewType'
import {IRenewSuper, IRenewTextValue} from '@/components/_chan/renew/()/type'
import useRenewWrapper from '@/components/_chan/renew/()/renewWrapper/useRenewWrapper'
import CommandOptionModal from '@/components/_chan/renew/valueTypeText/commandOptionModal/CommandOptionModal'

export default function ValueTypeTextSibling({
  idx,
  value,
  setValue,
  setAutoFocusIdx,
  containerRef,
  wrapperRef,
}: {
  idx: IRenewSuper['idx']
  value: IRenewTextValue['value']
  setValue: IRenewSuper['setValue']
  setAutoFocusIdx: IRenewSuper['setAutoFocusIdx']
  containerRef: ReturnType<typeof useRenewWrapper>['containerRef']
  wrapperRef: ReturnType<typeof useRenewWrapper>['wrapperRef']
}) {

  return (
    <>
      <CommandOptionModal
        content={value}
        changeContentType={(newType) => {
          changeTargetBlockTypeToNewType(
            newType, idx, setValue, setAutoFocusIdx
          )
        }}
        style={{
          width: 160,
          y: `calc(${wrapperRef.current?.getBoundingClientRect().height}px + ${containerRef.current?.offsetTop}px + 4px)`,
        }}
      />
    </>
  )
}