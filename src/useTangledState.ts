import * as React from 'react'
import { useTangledContext } from "./useTangledContext";
import { Cb, KeyOf } from './types';

type KeySetter<S, K extends keyof S> = (nextVal: S[K]) => void

export function useTangledState<S>(key: KeyOf<S>, defaultV: S[KeyOf<S>]): [ Readonly<S[KeyOf<S>]>, KeySetter<S, KeyOf<S>>] {

  const tangledContext = useTangledContext<S>();
  const [localState, setLocalState] = React.useState<Readonly<S[KeyOf<S>]>>(tangledContext.stateOf(key) || defaultV)

  const cbRef = React.useRef<Cb<S[KeyOf<S>]> | undefined>(undefined)

  React.useEffect(
    () => {
      cbRef.current = (newV, _oldV, source: unknown) => {
        if (source !== cbRef.current) {
          setLocalState(newV as any)
        }
      }
      return tangledContext.subscribe(key, cbRef.current)
    },
    []

  )
  React.useEffect(
    () => {
      if (localState !== tangledContext.stateOf(key)) {
        tangledContext.update(key, localState as S[KeyOf<S>], cbRef.current!)
      }
    },
    [localState]
  )
  return [ localState, setLocalState ]
}

