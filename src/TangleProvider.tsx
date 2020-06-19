import * as React from 'react'
import type { ITangleContext } from './types'
import { createContext } from './tangle'

export const TangleContext = React.createContext<ITangleContext<any>>(null as any)

interface ITangleProviderProps<S = any> {
  initial?: S
  children: React.ReactNode
}

export function TangleProvider<S>(props: ITangleProviderProps<S>) {
  const [hasInit, setHasInit] = React.useState(false)
  const tangleRef = React.useRef<ITangleContext<S>>(null as unknown as ITangleContext<S>)

  React.useEffect(
    () => {
      const emptyInitial: S = {} as S
      tangleRef.current = createContext(props.initial || emptyInitial)
      setHasInit(true)
    },
    []
  )
  if (hasInit) {
    return (
      <TangleContext.Provider value={tangleRef.current}>
        { props.children}
      </TangleContext.Provider>
    )
  }

  return null
}