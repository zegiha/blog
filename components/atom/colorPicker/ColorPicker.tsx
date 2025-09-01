'use client'

import {useState, useRef, useEffect} from 'react'
import Row from '@/components/atom/flex/Row'
import FadeInAndOut from '@/components/atom/fadeInAndOut/FadeInAndOut'
import style from './style.module.css'
import cn from 'classnames'

interface IColorPicker {
  value?: string
  onChange: (color: string) => void
  onClose?: () => void
  show?: boolean
  presetColors?: string[]
}

export default function ColorPicker({
  value,
  onChange,
  onClose,
  show = true,
  presetColors = [
    '#FF477E', // brand
    '#F53134', // red
    '#29C257', // green
    '#FFAA00', // yellow
    '#2E86F5', // blue
    '#1A1A1A', // dark
    '#858585', // gray
    '#FFFFFF', // white
  ]
}: IColorPicker) {
  const [customColor, setCustomColor] = useState(value || '#000000')
  const colorInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handlePresetColorClick = (color: string) => {
    onChange(color)
    onClose?.()
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setCustomColor(newColor)
    onChange(newColor)
  }

  const handleRemoveColor = () => {
    onChange('')
    onClose?.()
  }

  return (
    <FadeInAndOut
      show={show}
      animation={{
        duration: 'var(--transition-duration-fast)',
        fadeInClass: style.fadeIn,
        fadeOutClass: style.fadeOut,
      }}
    >
      <div ref={containerRef} className={style.colorPicker}>
        {/* 프리셋 색상들 */}
        <div className={style.presetColors}>
          <Row gap={4} wrap={true}>
            {presetColors.map((color) => (
              <button
                key={color}
                className={cn(style.presetColorButton, {
                  [style.selected]: value === color
                })}
                style={{ backgroundColor: color }}
                onClick={() => handlePresetColorClick(color)}
                title={`색상: ${color}`}
              />
            ))}
          </Row>
        </div>

        {/* 구분선 */}
        <div className={style.divider} />

        {/* 커스텀 색상 선택기 */}
        <div className={style.customColorSection}>
          <Row gap={8} alignItems={'center'}>
            <input
              ref={colorInputRef}
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className={style.colorInput}
            />
            <span className={style.colorLabel}>커스텀 색상</span>
          </Row>
        </div>

        {/* 구분선 */}
        <div className={style.divider} />

        {/* 색상 제거 버튼 */}
        <button
          className={style.removeColorButton}
          onClick={handleRemoveColor}
        >
          색상 제거
        </button>
      </div>
    </FadeInAndOut>
  )
}