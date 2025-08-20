'use client'

import {TTheme} from '@/shared/design/theme/type'
import { create } from 'zustand'

type State = {
  theme: TTheme
  setTheme: (t: TTheme) => void
  toggle: () => void
}

async function changeTheme(theme: TTheme) {
  try {
    if(typeof window === 'undefined') return
    const html = document.querySelector('html')
    if(!html) return

    await fetch('/api/theme', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ theme: theme }),
    })

    document.body.style.transition = 'all var(--transition-duration-normal) ease-in-out';

    setTimeout(() => {
      html.classList.remove('dark', 'light')
      html.classList.add(theme)
    }, 0)

    setTimeout(() => {
      document.body.style.transition = 'none';
    }, 370)
  } catch(e) {
    console.error('changeTheme', e)
  }
}

function getTheme(): TTheme {
  if(typeof window === 'undefined') return 'light'
  const html = document?.querySelector('html')
  if(!html) return 'light'
  const classNames = html.className
  if(classNames.includes('dark')) return 'dark'
  else if(classNames.includes('light')) return 'light'
  else {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    changeTheme(systemTheme)
    return systemTheme
  }
}

export const useThemeStore = create<State>((set, get) => ({
  theme: getTheme(),
  setTheme: (t) => {
    changeTheme(t)
      .then(() => set({ theme: t }))
  },
  toggle: () => {
    const theme = get().theme === 'light' ? 'dark' : 'light'
    changeTheme(theme)
      .then(() => set({ theme }))
  }
}))