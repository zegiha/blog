// 'use client'

import ArticleContainer from '@/components/molecule/articleContainer/ArticleContainer'
import BodySection from '@/widget/article/create/bodySection/BodySection'
import HeaderSection from '@/widget/article/create/headerSection/HeaderSection'
// import {useEffect} from 'react'

export default function Page() {
  // useEffect(() => {
  //   window.addEventListener('focusin', (e) => {
  //     console.log(e.target)
  //   })
  // }, []);

  return (
    <ArticleContainer>
      <HeaderSection/>
      <BodySection/>
    </ArticleContainer>
  )
}
