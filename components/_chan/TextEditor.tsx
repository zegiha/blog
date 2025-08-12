'use client'

import { useRef, useEffect } from 'react';

export default function TextEditor() {
  const editorRef = useRef<HTMLDivElement | null>(null)

  const toggleFormatting = (format: 'bold' | 'italic') => {
    // 현재 선택 영역 가져오기
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return; // 선택된 텍스트가 없으면 반환

    // 태그 이름 결정
    const tagName = format === 'bold' ? 'STRONG' : 'EM';

    // 선택 영역이 모두 해당 형식으로 되어 있는지 확인
    const isAllFormatted = isSelectionFullyFormatted(selection, tagName);

    if (isAllFormatted) {
      // 이미 모두 적용된 상태면 형식 제거
      removeFormatting(range, tagName);
    } else {
      // 아니면 형식 적용
      applyFormatting(range, format);
    }

    // 에디터에 포커스 유지
    editorRef.current?.focus();
  }

  // 선택 영역이 모두 특정 태그로 감싸져 있는지 확인
  const isSelectionFullyFormatted = (selection: Selection, tagName: string): boolean => {
    // 텍스트 노드들 수집
    const textNodes: Node[] = [];
    const range = selection.getRangeAt(0);

    const iterator = document.createNodeIterator(
      range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // 선택 영역에 포함된 텍스트 노드만 수집
          const nodeRange = document.createRange();
          nodeRange.selectNode(node);

          return range.intersectsNode(node)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    let currentNode;
    while ((currentNode = iterator.nextNode())) {
      textNodes.push(currentNode);
    }

    // 모든 텍스트 노드가 해당 형식 태그 내에 있는지 확인
    return textNodes.every(node => {
      let parent = node.parentNode;
      while (parent && parent !== editorRef.current) {
        if (parent.nodeName === tagName) {
          return true;
        }
        parent = parent.parentNode;
      }
      return false;
    });
  }

  // 형식 적용 함수
  const applyFormatting = (range: Range, format: 'bold' | 'italic') => {
    try {
      // 간단한 선택 영역인 경우 surroundContents 사용 시도
      const newNode = document.createElement(format === 'bold' ? 'strong' : 'em');
      range.surroundContents(newNode);
    } catch (e) {
      // 복잡한 선택 영역인 경우 대체 방법 사용
      handleComplexSelection(range, format);
    }
  }

  // 복잡한 선택 영역 처리(중첩된 서식이 있는 경우)
  const handleComplexSelection = (range: Range, format: 'bold' | 'italic') => {
    // 선택 영역의 내용을 DocumentFragment로 추출
    const fragment = range.extractContents();

    // 새로운 서식 요소 생성
    const formatElement = document.createElement(format === 'bold' ? 'strong' : 'em');

    // DocumentFragment의 내용을 서식 요소에 추가
    formatElement.appendChild(fragment);

    // 서식 요소를 선택 영역에 삽입
    range.insertNode(formatElement);
  }

  // 형식 제거 함수
  const removeFormatting = (range: Range, tagName: string) => {
    // 선택 영역 복제 (작업 중 선택 영역이 변경될 수 있으므로)
    const rangeClone = range.cloneRange();

    // 선택 영역의 내용을 DocumentFragment로 추출
    const fragment = rangeClone.extractContents();

    // 태그 제거하는 함수
    const removeTag = (node: Node): Node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === tagName) {
        // 태그는 제거하고 내용만 유지
        const content = document.createDocumentFragment();
        Array.from(node.childNodes).forEach(child => {
          // 자식 노드에 대해서도 재귀적으로 처리
          content.appendChild(removeTag(child.cloneNode(true)));
        });
        return content;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 다른 요소 노드의 경우 자식 노드들도 처리
        const newElement = node.cloneNode(false);
        Array.from(node.childNodes).forEach(child => {
          newElement.appendChild(removeTag(child.cloneNode(true)));
        });
        return newElement;
      } else {
        // 텍스트 노드는 그대로 유지
        return node.cloneNode(true);
      }
    };

    // 태그를 제거한 새 DocumentFragment 생성
    const cleanFragment = document.createDocumentFragment();
    Array.from(fragment.childNodes).forEach(node => {
      cleanFragment.appendChild(removeTag(node));
    });

    // 처리된 내용을 다시 삽입
    rangeClone.insertNode(cleanFragment);
  }

  const handleBoldClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      toggleFormatting('bold');
    }
  }

  const handleItalicClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      toggleFormatting('italic');
    }
  }

  // 에디터 내용 저장 기능
  const handleSaveContent = () => {
    if (editorRef.current) {
      console.log('저장된 HTML:', editorRef.current.innerHTML);
      // 여기서 내용을 서버에 저장하거나 다른 작업을 수행할 수 있습니다
    }
  }

  // 초기 내용 설정
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '여기에 텍스트를 입력하고 선택한 후 위 버튼을 클릭하세요.';
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={handleBoldClick}
          style={{
            fontWeight: 'bold',
            padding: '5px 10px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          B
        </button>
        <button
          onClick={handleItalicClick}
          style={{
            fontStyle: 'italic',
            padding: '5px 10px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          I
        </button>
        <button
          onClick={handleSaveContent}
          style={{
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginLeft: 'auto',
            cursor: 'pointer'
          }}
        >
          저장
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        style={{
          border: '1px solid #ccc',
          minHeight: '200px',
          padding: '10px',
          borderRadius: '4px',
          outline: 'none',
          lineHeight: '1.5',
          backgroundColor: 'white'
        }}
      ></div>

      <div style={{ fontSize: '0.8rem', color: '#666' }}>
        <p>사용 방법:</p>
        <ol>
          <li>텍스트를 선택하고 B 버튼을 클릭하면 볼드 스타일이 적용됩니다 (이미 적용된 경우 제거됩니다).</li>
          <li>텍스트를 선택하고 I 버튼을 클릭하면 이탤릭 스타일이 적용됩니다 (이미 적용된 경우 제거됩니다).</li>
          <li>같은 텍스트에 여러 스타일을 중첩 적용할 수 있습니다.</li>
        </ol>
      </div>
    </div>
  )
}