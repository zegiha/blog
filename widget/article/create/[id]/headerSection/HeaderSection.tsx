'use client'

import Divider from '@/components/atom/divider/Divider'
import Col from '@/components/atom/flex/Col'
import Row from '@/components/atom/flex/Row'
import EditableTypo from '@/components/atom/typo/editableTypo/EditableTypo'
import Typo from '@/components/atom/typo/Typo'
import parseDateToDashed from '@/shared/helper/parseDateToDashed'
import useDebounceString from '@/shared/hook/useDebounceString'
import TagControlSection from '@/widget/article/create/[id]/headerSection/tagControlSection/TagControlSection'
import {useParams} from 'next/navigation'
import {
  useEffect,
  useState,
} from 'react'

export default function HeaderSection() {
  const [title, setTitle, updateTitleForce] = useDebounceString()
  const [description, setDescription, updateDescriptionForce] = useDebounceString()

  const {id: articleId} = useParams<{id: string}>()

  useEffect(() => {
    const updateTitle = async () => {
      if(!title) return
      await fetch(`/api/article/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
        })
      })
    }

    updateTitle()
  }, [title])

  useEffect(() => {
    const updateDescription = async () => {
      if(!description) return
      await fetch(`/api/article/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
        })
      })
    }
    updateDescription()
  }, [description])

  return (
    <Col width={'fill-width'} gap={8} style={{zIndex: 2}}>
      <EditableTypo.xxlarge
        width={'fill-width'}
        placeholder={'제목을 입력해주세요'}
        changeContent={(v) => setTitle(v)}
        onBlur={updateTitleForce}
        color={'strong'}
        accent
      />
      <Row width={'fill-width'} alignItems={'center'} gap={8}>
        <Typo.small width={'hug'} color={'alternative'}>
          {parseDateToDashed(new Date())}
        </Typo.small>
        <Divider type={'circular'} />
        <EditableTypo.small
          width={'fill-flex'}
          placeholder={'글 설명을 입력해주세요'}
          changeContent={(v) => setDescription(v)}
          onBlur={updateDescriptionForce}
          color={'alternative'}
        />
      </Row>
      <TagControlSection />
    </Col>
  )
}
