export default function handleKeyDown(e: React.KeyboardEvent) {
  const isTab = e.key === 'Tab'
  const isShift = e.shiftKey
  const isUpArrow = e.key === 'ArrowUp'
  const isDownArrow = e.key === 'ArrowDown'

  if (isTab || isUpArrow || isDownArrow) {
    e.preventDefault() // 기본 Tab 동작 방지

    const currentElement = e.target as HTMLElement
    const container = e.currentTarget
    const focusableElements = container.children
    const currentIndex = Array.from(focusableElements).indexOf(currentElement)

    let nextIndex

    const isBack = (isTab && isShift) || isUpArrow

    if (isBack) {
      // Shift + Tab: 이전 요소로
      nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
    } else {
      // Tab: 다음 요소로
      nextIndex = currentIndex === focusableElements.length - 1 ? 0 : currentIndex + 1
    }

    (focusableElements[nextIndex] as HTMLElement).focus()
  }
}
