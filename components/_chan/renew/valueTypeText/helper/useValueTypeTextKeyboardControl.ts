export function getTextLength(node: Node): number {
  if(node.nodeType === Node.TEXT_NODE) {
    return ((node as Text).data ?? node.textContent ?? '').length
  }

  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
  let current: Node | null = walker.nextNode()

  let total = 0

  while(current) {
    total += (current.textContent ?? '').length
    current = walker.nextNode()
  }

  return total
}
