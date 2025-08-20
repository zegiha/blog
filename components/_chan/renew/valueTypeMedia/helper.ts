import {IRenewMediaValue, IRenewSuper, TNullableRenewMediaValue} from '@/components/_chan/renew/()/type'

export function changeTargetIdxMediaValue(
  idx: number,
  setValue: IRenewSuper['setValue'],
  newValue: TNullableRenewMediaValue,
) {
  setValue(p => {
    if(p[idx].type !== 'image')
      throw new Error('target type must be image')

    const processedNewValue: IRenewMediaValue = {
      type: newValue.type ?? p[idx].type,
      src: newValue.src ?? p[idx].src,
      alt: newValue.alt ?? p[idx].alt,
      position: newValue.position ?? p[idx].position,
      width: newValue.width ?? p[idx].width,
    }

    return [
      ...p.slice(0, idx),
      {...processedNewValue},
      ...p.slice(idx + 1)
    ]
  })
}