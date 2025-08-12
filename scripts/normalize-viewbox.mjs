import fg from 'fast-glob'
import fs from 'fs/promises'
import * as path from 'path'
import { load } from 'cheerio'

const TARGET_BOX = { x: 0, y: 0, w: 24, h: 24 } // ← 표준 크기

// 파일 안의 <svg viewBox="minX minY width height">를 파싱
function parseViewBox(viewBox) {
  const [minX, minY, w, h] = viewBox.split(/\s+|,/).map(Number)
  return { minX, minY, w, h }
}

for (const file of await fg('public/icon/**/*.svg')) {
  const src = await fs.readFile(file, 'utf8')
  const $ = load(src, { xmlMode: true })
  const $svg = $('svg')

  // viewBox 없으면 width/height로 추정
  let vb = $svg.attr('viewBox')
  if (!vb) {
    const w = parseFloat($svg.attr('width') || '24')
    const h = parseFloat($svg.attr('height') || '24')
    vb = `0 0 ${w} ${h}`
  }
  const { minX, minY, w, h } = parseViewBox(vb)

  // 스케일(짧은 변 맞춤) + 중앙 정렬용 평행이동
  const scale = Math.min(TARGET_BOX.w / w, TARGET_BOX.h / h)
  const newW = w * scale
  const newH = h * scale
  const tx = (TARGET_BOX.w - newW) / 2 - minX * scale
  const ty = (TARGET_BOX.h - newH) / 2 - minY * scale

  // 기존 width/height 제거(뷰박스 기반으로 렌더)
  $svg.removeAttr('width')
  $svg.removeAttr('height')

  // 내용 래핑해서 transform 적용
  const inner = $svg.html() || ''
  $svg.html(`<g transform="translate(${tx} ${ty}) scale(${scale})">${inner}</g>`)

  // 표준 viewBox로 교체
  $svg.attr('viewBox', `${TARGET_BOX.x} ${TARGET_BOX.y} ${TARGET_BOX.w} ${TARGET_BOX.h}`)

  // (선택) 모든 색을 currentColor로 통일하고 싶다면:
  // $('*[fill]').attr('fill', 'currentColor')
  // $('*[stroke]').attr('stroke', 'currentColor')

  await fs.writeFile(file, $.xml(), 'utf8')
  console.log('normalized:', path.relative(process.cwd(), file))
}