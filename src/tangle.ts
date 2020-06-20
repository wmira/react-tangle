import { ITangleContext, Cb, KeyOf } from "./types";

export const createContext = <S>(initial?: S): ITangleContext<S> => {

  let root: S = initial || {} as S
  const callbacks: Record<string, Cb<S[KeyOf<S>]>[]> = {}

  return {
    stateOf<K extends keyof S>(key: K) {
      return root[key]
    },
    update<K extends keyof S, C = unknown>(key: K, newV: S[K], caller?: C) {
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
    subscribe<K extends keyof S>(key: K, cb: Cb<S[K]>) {
      let cbs: Cb<S[K]>[] = callbacks[key as string]
      if (!cbs) {
        cbs = [];
        // fix this typing
        (callbacks as any)[key as string] = cbs as Cb<S[K]>[]
      }
      cbs.push(cb)
      return () => {
        cbs.splice(cbs.indexOf(cb), 1)
      }
    }
  }

}
