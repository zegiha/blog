import Row from '@/components/atom/flex/Row'
import Typo from '@/components/atom/typo/Typo'
import Photo from '@/components/atom/icon/Photo'
import interactionStyle from '@/shared/design/interaction/interaction.module.css'
import cn from 'classnames'
import {useState} from 'react'
import style from './style.module.css'

export default function MediaInput({
  handleFileInput,
  handleInputSubmit,
}: {
  handleFileInput: (e: React.InputEvent<HTMLInputElement>) => void;
  handleInputSubmit: (v: string) => void;
}) {
  const [textInputValue, setTextInputValue] = useState<string>('')

  return (
    <Row width={'fill-width'} gap={16}>
      <Row
        className={cn(
          style.imagePlaceholder,
          interactionStyle.interaction
        )}
        width={'fill-width'}
        gap={8}
        alignItems={'center'}
      >
        <Photo
          color={'var(--label-alternative)'}
          fill={'var(--label-alternative)'}
          width={24}
          height={24}
        />
        <Typo.medium color={'alternative'}>
          이미지 추가
        </Typo.medium>
        <input
          name="getImage"
          id="getImage"
          className={style.imageInput}
          type="file"
          accept={'image/*'}
          autoFocus={true}
          multiple={true}
          onInput={handleFileInput}
        />
      </Row>
      <Row width={'fill-width'} gap={8}>
        <input
          placeholder={'링크로 추가'}
          type="text"
          value={textInputValue}
          onChange={(e) => setTextInputValue(e.target.value)}
        />
        <button onClick={() => handleInputSubmit(textInputValue)}>
          <Typo.medium color={'normal'}>
            추가
          </Typo.medium>
        </button>
      </Row>
    </Row>
  )
}