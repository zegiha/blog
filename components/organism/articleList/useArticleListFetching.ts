'use client'

import { TArticleSummaryEntity } from '@/entity/article/ArticleSummaryEntity'
import { useState } from 'react'

export default function useArticleListFetching() {
  // 더미 데이터 생성
  const dummyData: TArticleSummaryEntity[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: '리액트 훅의 기초',
      description: '리액트 함수형 컴포넌트에서 훅을 사용하는 방법에 대해 알아봅니다.',
      createdAt: new Date('2023-10-15'),
      tags: ['React', 'Hooks', '프론트엔드']
    },
    {
      id: '223e4567-e89b-12d3-a456-426614174001',
      title: 'Next.js와 서버 컴포넌트',
      description: 'Next.js 13 이상에서 서버 컴포넌트 사용법을 알아봅니다.',
      createdAt: new Date('2023-11-20'),
      tags: ['Next.js', 'Server Components', 'React']
    },
    {
      id: '323e4567-e89b-12d3-a456-426614174002',
      title: 'Zod로 타입 안전성 확보하기',
      description: 'Zod를 사용하여 런타임에서도 타입 안전성을 확보하는 방법을 알아봅니다.',
      createdAt: new Date('2023-12-05'),
      tags: ['TypeScript', 'Zod', '유효성 검사']
    }
  ]

  const [data, setData] = useState<Array<TArticleSummaryEntity>>(dummyData)

  return { data }
}