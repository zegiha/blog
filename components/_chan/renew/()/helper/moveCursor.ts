export default function moveCursor(
  cursorLocation: {x: number, y: number},
  revertCaretColor: () => void
) {
  setTimeout(() => {
    const sel = window.getSelection()
    if(sel === null) return

    const focusNode = sel.focusNode
    if(focusNode === null) return

    const range = document.createRange()

    const {node, offset} = resolveTextPosition(focusNode, cursorLocation)

    try {
      range.setStart(node, offset)
    } catch {
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


// 기존 moveCursor는 그대로 두되, resolveTextPosition만 교체
function resolveTextPosition(focusNode: Node, pt: { x: number; y: number })
  : { node: Node; offset: number } {

  // 1) contentEditable 블록 찾기
  const startEl = (focusNode.nodeType === Node.ELEMENT_NODE
    ? (focusNode as Element)
    : (focusNode.parentElement)) as Element | null;

  const block = startEl?.closest('[contenteditable="true"], div, p') as Element | null;

  // 2) 좌표를 뷰포트 기준 (client 좌표)로 변환
  // - 기본은 "블록 내부 로컬좌표"로 가정
  // - 만약 이미 viewport 좌표처럼 큰 값이면 그대로 사용
  let vx = pt.x;
  let vy = pt.y;

  if (block) {
    const rect = block.getBoundingClientRect();

    // 로컬좌표로 보이면 viewport 좌표로 변환
    const looksLocal =
      pt.x >= -1 && pt.y >= -1 && pt.x <= rect.width + 1 && pt.y <= rect.height + 1;

    if (looksLocal) {
      vx = rect.left + pt.x;
      vy = rect.top + pt.y;
    }

    // 3) 블록 경계 안으로 클램프 (라인 내부로 살짝 들어오게 +/-1)
    vx = Math.min(Math.max(vx, rect.left + 1), rect.right - 1);
    vy = Math.min(Math.max(vy, rect.top + 1), rect.bottom - 1);
  }

  // 4) 좌표 → Range (브라우저 호환)
  const rng = caretRangeFromPointCompat(vx, vy);
  if (rng) {
    return { node: rng.startContainer, offset: rng.startOffset };
  }

  // 5) 폴백: 텍스트가 없거나 실패 시 현재 포커스 노드 끝
  // (원하면 여기서 블록의 마지막 텍스트 노드를 찾아도 됨)
  const fallbackNode = focusNode;
  const len = (fallbackNode.textContent ?? "").length;
  return { node: fallbackNode, offset: len };
}

function caretRangeFromPointCompat(x: number, y: number): Range | null {
  const anyDoc = document as any;

  // Chrome/Safari
  if (typeof anyDoc.caretRangeFromPoint === 'function') {
    const r = anyDoc.caretRangeFromPoint(x, y) as Range | null;
    if (r) return r;
  }

  // Firefox
  if (typeof anyDoc.caretPositionFromPoint === 'function') {
    const pos = anyDoc.caretPositionFromPoint(x, y);
    if (pos) {
      const r = document.createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse(true);
      return r;
    }
  }

  return null;
}

