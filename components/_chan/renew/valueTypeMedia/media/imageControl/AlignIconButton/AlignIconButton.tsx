import {IAlignIconButton} from '@/components/_chan/renew/valueTypeMedia/media/imageControl/AlignIconButton/type'
import AlignHorizontalCenter from '@/components/atom/icon/AlignHorizontalCenter'
import AlignHorizontalLeft from '@/components/atom/icon/AlignHorizontalLeft'
import AlignHorizontalRight from '@/components/atom/icon/AlignHorizontalRight'
import style from './style.module.css'

export default function AlignIconButton({
  isActive,
  imageAlign,
  changePosition,
}: IAlignIconButton) {
  const props = {
    fill: isActive ? 'var(--static-white)' : 'var(--gray-30)',
    color: isActive ? 'var(--static-white)' : 'var(--gray-30)',
    width: 20,
    height: 20
  }

  switch(imageAlign) {
    case 'start': return <button className={style.imageControlButton} onClick={() => changePosition('start')}>
      <AlignHorizontalLeft {...props}/>
    </button>
    case 'center': return <button className={style.imageControlButton} onClick={() => changePosition('center')}>
      <AlignHorizontalCenter {...props}/>
    </button>
    case 'end': return <button className={style.imageControlButton} onClick={() => changePosition('end')}>
      <AlignHorizontalRight {...props}/>
    </button>
  }
}