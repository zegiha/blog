import {Dispatch, SetStateAction} from "react";

export default function changeAutoFocusIdx(
  idx: number,
  setAutoFocusIdx: Dispatch<SetStateAction<number | null>>
) {
  setAutoFocusIdx(null)

  document.body.style.caretColor = 'transparent'

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      setAutoFocusIdx(idx)
      resolve() // setTimeout 실행 완료 후 then으로 연결 가능
    }, 0)
  })
}
