import {IRenewMediaValue, IRenewTextValue} from "@/components/_chan/renew/()/type";
import {Dispatch, SetStateAction} from "react";
import getNearestTextIdxByDirection from "@/components/_chan/renew/()/helper/getNearestTextIdxByDirection";
import changeAutoFocusIdx from "@/components/_chan/renew/()/helper/changeAutoFocusIdx";
import moveCursor from "@/components/_chan/renew/()/helper/moveCursor";

export default function focusNextText(
  idx: number,
  data: Array<IRenewTextValue | IRenewMediaValue>,
  setAutoFocusIdx: Dispatch<SetStateAction<number | null>>,
  cursorLocation: {x: number, y: number}
) {
  changeAutoFocusIdx(
    getNearestTextIdxByDirection(idx, 1, data),
    setAutoFocusIdx
  ).then(() => moveCursor(cursorLocation, () => {
    if(document.body)
      document.body.style.caretColor = 'auto'
  }))
}
