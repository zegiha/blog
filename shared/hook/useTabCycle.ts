'use client'

import useCallbackRef from '@/shared/hook/useCallbackRef'
import {RefObject, useEffect} from 'react'

export default function useTabCycle<T extends HTMLElement>(
  refParam?: RefObject<T>,
) {
}