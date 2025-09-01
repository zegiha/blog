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
  useEffect, useRef,
} from 'react'

export default function HeaderSection() {
  const titleRef = useRef<HTMLElement | null>(null)
  const descriptionRef = useRef<HTMLElement | null>(null)

  const [title, setTitle, updateTitleForce] = useDebounceString()
  const [description, setDescription, updateDescriptionForce] = useDebounceString()

  const {id: articleId} = useParams<{id: string}>()

  const now = new Date()

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/api/article/save/${articleId}?select=title,description`)
      const data = await res.json()

      setTitle(data.title)
      setDescription(data.description)
    }
    init()

    const updateCreatedAt = async() => {
      await fetch(`/api/article/save/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          createdAt: now,
        })
      })
    }
    updateCreatedAt()
  }, []);

  useEffect(() => {
    if(titleRef.current && title !== titleRef.current.innerText) {
      titleRef.current.innerText = title
      const ev = new Event('input', {bubbles: true})
      titleRef.current.dispatchEvent(ev)
    }

    const updateTitle = async () => {
      if(!title) return
      await fetch(`/api/article/save/${articleId}`, {
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
    if(descriptionRef.current && description !== descriptionRef.current.innerText) {
      descriptionRef.current.innerText = description
      const ev = new Event('input', {bubbles: true})
      descriptionRef.current.dispatchEvent(ev)
    }

    const updateDescription = async () => {
      if(!description) return
      await fetch(`/api/article/save/${articleId}`, {
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
        ref={titleRef}
        width={'fill-width'}
        placeholder={'제목을 입력해주세요'}
        changeContent={(v) => setTitle(v)}
        onBlur={updateTitleForce}
        color={'strong'}
        accent
      />
      <Row width={'fill-width'} alignItems={'center'} gap={8}>
        <Typo.small width={'hug'} color={'alternative'}>
          {parseDateToDashed(now)}
        </Typo.small>
        <Divider type={'circular'} />
        <EditableTypo.small
          ref={descriptionRef}
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
