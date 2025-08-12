'use client'

import {useThemeStore} from '@/shared/design/theme/themeStore'

export default function ColorChange() {
  const {
    toggle
  } = useThemeStore()

  return (
    <button
      onClick={() => toggle()}
      style={{
        padding: 'var(--dimension-08) var(--dimension-16)',
        border: '1px solid var(--line-border)',
        borderStyle: 'inset',
        backgroundColor: 'var(--component-fill-normal)',
        borderRadius: 'var(--radius-24)',
        fontSize: 'var(--typo-medium-font-size)',
        lineHeight: 'var(--typo-medium-line-height)',
        fontWeight: 'var(--typo-font-weight-normal)',
        color: 'var(--label-normal)',
        outline: 'none',
        cursor: 'pointer'
      }}
    >
      테마 바꾸기
    </button>
  )
}