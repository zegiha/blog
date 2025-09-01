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

export function moveCursor(
  direction: 'up' | 'down',
  cursorLocation: number | 'end',
  revertCaretColor: () => void
) {
  setTimeout(() => {

    const sel = window.getSelection()
    if(sel === null) return

    const focusNode = sel.focusNode
    if(focusNode === null) return

    const focusTextNodes = (Array.from(focusNode.childNodes).filter(v => v.nodeType === Node.TEXT_NODE))

    const range = document.createRange()

    const {offset} = resolveTextPosition(focusNode, cursorLocation)
    const node = focusTextNodes[direction === 'down' ? 0 : focusTextNodes.length - 1]

    try {
      range.setStart(node, offset)
    } catch {
      if(node === undefined)
        range.setStart(focusNode, 0)
      else
        range.setStart(node, 0)
    }
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
  }, 0)

  setTimeout(() => {
    revertCaretColor()
  }, 0)
}

function resolveTextPosition(root: Node, index: number | 'end')
  : { node: Text | Node; offset: number } {
  // Text 노드가 전혀 없을 수 있으므로 대비
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current: Node | null = walker.nextNode();

  if (!current) {
    // 텍스트가 하나도 없으면 루트(Element) 기준으로 커서를 0에 둔다
    return { node: root, offset: 0 };
  }

  // 음수 인덱스는 0으로
  const targetIndex = Math.max(0, index === 'end' ? Infinity : index);

  // 총 길이 파악과 동시에 대상 위치 탐색
  let accumulated = 0;
  let lastTextNode: Text = current as Text;

  while (current) {
    const text = (current.textContent ?? "");
    const len = text.length;
    if (targetIndex <= accumulated + len) {
      // current 내부의 로컬 오프셋
      const localOffset = Math.max(0, Math.min(len, targetIndex - accumulated));
      return { node: current as Text, offset: localOffset };
    }
    accumulated += len;
    lastTextNode = current as Text;
    current = walker.nextNode();
  }

  // index가 총 길이보다 크면 마지막 Text 노드의 끝으로
  return { node: lastTextNode, offset: (lastTextNode.textContent ?? "").length };
}