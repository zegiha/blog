import { useState, useEffect, useRef } from 'react'

interface UseControlSectionProps {
  optionModalOpen: boolean
}

export function useControlSection({ optionModalOpen }: UseControlSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [showControlSection, setShowControlSection] = useState<boolean>(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const enter = () => setShowControlSection(true)
    const leave = () => setShowControlSection(false)

    if (optionModalOpen) {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
      leave()
      return
    }

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)

    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [optionModalOpen])

  return {
    containerRef,
    showControlSection
  }
}