import * as React from 'react'
import { useTangledContext } from "./useTangledContext";
import { Cb } from './types';

type KeyFnSetter<S> = (currentVal: S) => S
type KeySetter<S, K extends keyof S> = (nextVal: S[K] | KeyFnSetter<S[K]>) => void

export function useTangledState<S, K extends keyof S>(key: K, defaultV: S[K]): [ Readonly<S[K]>, KeySetter<S, K>] {

  const tangledContext = useTangledContext<S>();
  const [localState, setLocalState] = React.useState<Readonly<S[K]>>(tangledContext.stateOf<K>(key) || defaultV)

  const cbRef = React.useRef<Cb<S[K]>>()

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
  const setState = React.useCallback(
    (nextV: S[K] | KeyFnSetter<S[K]>) => {
      let toSet = nextV
      if (typeof nextV === 'function') {
        toSet = (nextV as any)(tangledContext.stateOf(key))
      }
      setLocalState(toSet as any)
      tangledContext.update<K>(key, toSet as any, cbRef.current)      
    },
    [key, cbRef.current, setLocalState]
  )
  
  return [ localState, setState ]
}

