import {TArticleContent} from "@/app/api/article/route";
import {ReactNode} from "react";
import {FormatListBulleted, H1, H2, Text, X2} from "@/components/atom/icon";

export const textTypeEl: {
  [K in keyof TArticleContent]: {
    icon: ReactNode,
    label: string,
  }
} = {
  h1: {
    icon: <H1 fill={'var(--label-normal)'} color={'var(--label-normal)'} width={24} height={24}/>,
    label: '제목1',
  },
  h2: {
    icon: <H2 fill={'var(--label-normal)'} color={'var(--label-normal)'} width={24} height={24}/>,
    label: '제목2',
  },
  list: {
    icon: <FormatListBulleted fill={'var(--label-normal)'} color={'var(--label-normal)'} width={24} height={24}/>,
    label: '리스트',
  },
  content: {
    icon: <Text fill={'var(--label-normal)'} color={'var(--label-normal)'} width={24} height={24}/>,
    label: '텍스트',
  },
  footnote: {
    icon: <X2 fill={'var(--label-normal)'} color={'var(--label-normal)'} width={24} height={24}/>,
    label: '주석',
  }
}
