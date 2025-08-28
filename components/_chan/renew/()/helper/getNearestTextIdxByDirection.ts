import {IRenewMediaValue, IRenewTextValue} from "@/components/_chan/renew/()/type";

export default function getNearestTextIdxByDirection(
  idx: number,
  d: number,
  data: Array<IRenewTextValue | IRenewMediaValue>,
) {
  let ans = idx

  do {
    ans += d
  } while(
    0 <= ans &&
    ans < data.length &&
    data[ans].type === 'image'
    )

  return Math.max(0, Math.min(ans, data.length - 1))
}
