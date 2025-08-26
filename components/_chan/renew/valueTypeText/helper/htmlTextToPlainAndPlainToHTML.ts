import {IRenewSuper} from '@/components/_chan/renew/()/type'

export function htmlToPlain(html: string): string {
  return html
    // 통일
    .replace(/\r\n?/g, '\n')
    // 공백 엔티티
    .replace(/&nbsp;/gi, ' ')
    // <div><br></div> 패턴을 먼저 처리 (빈 줄)
    .replace(/<div>\s*<br\s*\/?>\s*<\/div>/gi, '\n')
    // 공백만 있는 div 처리 (공백 보존)
    .replace(/<div>(\s|&nbsp;)*<\/div>/gi, (match) => {
      // div 내부의 공백과 &nbsp;를 추출하여 일반 공백으로 변환
      const content = match.replace(/<div>|<\/div>/gi, '').replace(/&nbsp;/gi, ' ');
      return content || '\n'; // 완전 빈 경우 줄바꿈
    })
    // 줄바꿈 태그 → \n
    .replace(/<br\s*\/?>/gi, '\n')
    // 완전 빈 div → \n  (빈 줄 보존)
    .replace(/<div>\s*<\/div>/gi, '\n')
    // div 경계 → \n  (블록 사이 줄바꿈)
    .replace(/<\/div>\s*<div>/gi, '\n')
    // 닫는 div는 줄바꿈으로 (마지막 자식이 텍스트여도 줄 끝 처리)
    .replace(/<\/div>\s*/gi, '\n')
    // 여는 div 제거
    .replace(/<div[^>]*>/gi, '')
    // p도 블록이니 같은 규칙 적용
    .replace(/<\/p>\s*/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    // 기본 엔티티
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    // 제로폭 제거
    .replace(/\u200B/g, '');
}

export function plainToHtml(text: string): string {
  return text
    // HTML 특수문자 이스케이프
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // 연속된 공백을 &nbsp;로 변환 (2개 이상인 경우)
    .replace(/ {2,}/g, (match) => {
      return ' ' + '&nbsp;'.repeat(match.length - 1);
    })
    // 줄바꿈을 <div> 태그로 변환
    .split('\n')
    .map((line, index, array) => {
      // 빈 줄은 <div><br></div>로
      if (line.trim() === '') {
        return '<div><br></div>';
      }
      // 공백만 있는 줄도 적절히 처리
      if (line.length > 0 && line.trim() === '') {
        // 공백만 있는 경우
        const converted = line.replace(/ {2,}/g, (match) => {
          return ' ' + '&nbsp;'.repeat(match.length - 1);
        });
        return `<div>${converted}</div>`;
      }
      // 내용이 있는 줄은 <div>내용</div>로
      return `<div>${line}</div>`;
    })
    .join('');
}

export function changeTargetIdxTextValueEndContent(
  idx: IRenewSuper['idx'],
  setValue: IRenewSuper['setValue'],
  newContent: string | undefined | null
) {
  setValue(p => {
    if(newContent === undefined || newContent === null) return [...p]

    const target = {...p[idx]}

    if(target.type === 'image')
      throw new Error("ValueTypeText's value can not be image")

    const targetValue = {...target.value.at(-1)}
    // const newContent = htmlToPlain(ref.current.innerHTML)

    return[
      ...p.slice(0, idx),
      {
        ...target,
        value: [
          ...target.value.slice(0, target.value.length-1),
          {
            ...targetValue,
            content: newContent !== '\n' ? newContent : '',
          }
        ]
      },
      ...p.slice(idx + 1)
    ]
  })
}
