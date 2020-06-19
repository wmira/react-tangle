import type { ITangleContext, KeyOf, Cb } from "./types";

export const createContext = <S>(initial?: S): ITangleContext<S> => {

  let root: S = initial || {} as S
  const callbacks: Record<string, Cb<S[KeyOf<S>]>[]> = {}

  return {
    stateOf(key: KeyOf<S>) {
      return root[key]
    },
    update<C = unknown>(key: KeyOf<S>, newV: S[KeyOf<S>], caller?: C) {
      const oldV = root[key]
      root[key] = newV
      setTimeout(
        () => {
          // run listeners after next cycle
          const cbs = callbacks[key as string] || []
          cbs.forEach(cb => {
            cb(newV, oldV, caller)
          })
        },
        0
      )
    },
    subscribe(key: KeyOf<S>, cb: Cb<S[KeyOf<S>]>) {
      let cbs = callbacks[key as string]
      if (!cbs) {
        cbs = []
        callbacks[key as string] = cbs
      }
      cbs.push(cb)
      return () => {
        cbs.splice(cbs.indexOf(cb), 1)
      }
    }
  }

}
