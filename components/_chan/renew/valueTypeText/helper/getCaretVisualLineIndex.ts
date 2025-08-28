/**
 * contentEditable 내부에서 soft wrap까지 고려한 "시각적 줄" 인덱스를 구한다.
 * @param root 줄을 셀 기준 블록(대개 contentEditable 루트)
 * @returns { lineIndex: number, lineCount: number }  // 0-based line index
 */
export function getCaretVisualLineIndex(root: HTMLElement) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return { lineIndex: -1, lineCount: 0 };

  // 커서 기준으로 (선택돼 있으면 끝 위치)로 접기
  const caret = sel.getRangeAt(0).cloneRange();
  caret.collapse(false);

  // 커서가 root 안에 있는지 보장
  const startEl =
    (caret.startContainer.nodeType === Node.ELEMENT_NODE
      ? (caret.startContainer as Element)
      : (caret.startContainer.parentElement)) || null;
  if (!startEl) return { lineIndex: -1, lineCount: 0 };

  const block = startEl.closest('[contenteditable="true"], div, p');
  if (!block || !root.contains(block)) return { lineIndex: -1, lineCount: 0 };

  // 1) 블록 전체 라인 수
  const full = document.createRange();
  full.selectNodeContents(block);
  const fullLines = uniqueLineTops(full.getClientRects());

  // 2) 블록의 시작부터 커서까지의 라인 수
  const upto = document.createRange();
  upto.setStart(block, 0);
  try {
    // 커서가 텍스트노드/요소노드 어떤 상태든 현재 caret 끝까지 설정
    upto.setEnd(caret.startContainer, caret.startOffset);
  } catch {
    // 드물게 offset 오류가 날 수 있어 fallback
    upto.selectNodeContents(block);
  }
  const uptoLines = uniqueLineTops(upto.getClientRects());

  // 현재 줄 인덱스 = 커서까지 고유 라인 수 - 1 (0-based)
  const lineIndex = Math.max(0, uptoLines.length - 1);
  const lineCount = fullLines.length;

  return { lineIndex, lineCount };

  // ----- helpers -----
  function uniqueLineTops(rectList: DOMRectList | readonly DOMRect[]) {
    const EPS = 1; // 줌/서브픽셀 보정
    const tops: number[] = [];
    for (const r of Array.from(rectList)) {
      // display:inline 요소들이 같은 줄에서 여러 rect로 쪼개질 수 있으므로 top으로 라인 그룹핑
      const t = r.top;
      if (!tops.some((v) => Math.abs(v - t) < EPS)) {
        tops.push(t);
      }
    }
    // 위에서부터 정렬
    tops.sort((a, b) => a - b);
    return tops;
  }
}
