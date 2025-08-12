import {useCallback, useEffect, useState} from 'react'

/**
 * 페이지네이션 기반 무한 스크롤 데이터를 불러오는 커스텀 훅
 * @param fetchFn 페이지 번호를 받아 데이터를 불러오는 함수
 * @param initialPageNumber 초기 페이지 번호
 * @param setNextPage 다음 페이지 존재 여부를 결정하는 함수
 * @returns 로딩 상태와 데이터, 다음 페이지 로딩 함수를 포함한 객체
 */
export default function useInfiniteQuery<T>({
  fetchFn,
  initialPageNumber,
  setNextPage,
}: {
  fetchFn: (page: number) => Promise<T>
  initialPageNumber: number
  setNextPage: (prevRes: T) => boolean
}) {
  const [data, setData] = useState<Array<{ page: number, data: T }>>([])
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending')
  const [fetchingStatus, setFetchingStatus] = useState<'idle' | 'pending' | 'error'>('idle')
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const newData = await fetchFn(initialPageNumber)
        const newItem = { page: initialPageNumber, data: newData }

        setData([newItem])
        setHasNextPage(setNextPage(newData)) // 직접 newData 사용
        setStatus('success')
      } catch(e) {
        setStatus('error')
        throw e
      }
    }
    firstFetch()
  }, [])

  const fetchNextPage = useCallback(async () => {
    if (fetchingStatus === 'pending' || !hasNextPage || status !== 'success') return

    try {
      setFetchingStatus('pending')

      // 함수형 업데이트로 최신 상태 보장
      setData(prevData => {
        const nextPage = prevData[prevData.length - 1].page + 1
        // 비동기 작업을 별도로 처리
        fetchFn(nextPage).then(newData => {
          const newItem = { page: nextPage, data: newData }
          setData(prev => [...prev, newItem])
          setHasNextPage(setNextPage(newData))
          setFetchingStatus('idle')
        }).catch(e => {
          setFetchingStatus('error')
          throw e
        })

        return prevData
      })
    } catch(e) {
      setFetchingStatus('error')
      throw e
    }
  }, [fetchingStatus, hasNextPage, status, fetchFn, setNextPage])

  return {
    data,
    status,
    fetchingStatus,
    hasNextPage,
    fetchNextPage
  }
}