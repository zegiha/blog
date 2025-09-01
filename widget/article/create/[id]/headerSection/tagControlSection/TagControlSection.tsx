import Row from '@/components/atom/flex/Row'
import Badge from '@/components/atom/badge/Badge'
import AddTagModal from '@/widget/article/create/[id]/headerSection/tagControlSection/addTagModal/AddTagModal'
import {useParams} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function TagControlSection() {
  const {id} = useParams<{id: string}>()

  const [isInit, setIsInit] = useState<boolean>(false)
  const [tags, setTags] = useState<Array<string>>([])

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/api/article/save/${id}?select=tags`)
      const data = await res.json()
      setTags(data.tags)
      setIsInit(true)
    }
    init()
  }, []);

  useEffect(() => {
    const updateTags = async () => {
      await fetch(`/api/article/save/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tags,
        })
      })
    }
    if(isInit) updateTags()
  }, [tags, isInit])

  return (
    <Row gap={8} alignItems={'center'} wrap>
      {tags.map((v, i) => (
        <Badge key={i} size={'small'} onClick={() => {
          setTags(p => ([
            ...p.slice(0, i),
            ...p.slice(i + 1)
          ]))
        }}>
          {v}
        </Badge>
      ))}
      <AddTagModal addTag={(tag) => {
        setTags([...tags, tag])
      }} />
    </Row>
  )
}
