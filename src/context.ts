import { createContext, MutableRefObject } from 'react'

type Shift = boolean | null | string
type SetShift = React.Dispatch<React.SetStateAction<Shift>>

export const ShiftContext = createContext<{
  shift: Shift
  setShift?: SetShift
  immediate: React.MutableRefObject<boolean>
  height?: number
}>({ shift: null, immediate: null })
