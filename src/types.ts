
export type UpdateFn<S> = (state: S) => S
export type Subscriber<S> = (state: S) => void

export type Cb<S = unknown> = (newV: S, oldV: S, source?: unknown) => void

export type Unsubscribe = () => void

export interface ITangleContext<S> {
  stateOf<K extends keyof S>(key: K): S[K]
  subscribe<K extends keyof S>(key: KeyOf<S>, cb: Cb<S[K]> ): Unsubscribe
  /**
   * Update the given
   * @param key
   * @param source
   */
  update<K extends keyof S, C = unknown>(key: K, newV: S[K], caller?: C): void
}

export type KeyOf<S> = keyof S
