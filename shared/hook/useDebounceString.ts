'use client'

import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react'

export default function useDebounceString(debounceTime: number = 500): [string, Dispatch<SetStateAction<string>>, () => void] {
  const [value, setValue] = useState<string>('')
  const [realValue, setRealValue] = useState<string>('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(value !== realValue)
        setValue(realValue)
    }, debounceTime);


    return () => clearTimeout(timeout);
  }, [realValue, value]);

  const updateValueForce = useCallback(() => {
    if(value !== realValue)
      setValue(realValue)
  }, [realValue, value])

  return [
    value,
    setRealValue,
    updateValueForce,
  ]
}