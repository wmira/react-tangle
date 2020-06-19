
export type UpdateFn<S> = (state: S) => S
export type Subscriber<S> = (state: S) => void

export type Cb<S> = (newV: S, oldV: S, source?: unknown) => void

export type Unsubscribe = () => void

export interface ITangleContext<S> {
  stateOf(key: KeyOf<S>): S[KeyOf<S>]
  subscribe(key: KeyOf<S>, cb: Cb<S[KeyOf<S>]> ): Unsubscribe
  /**
   * Update the given
   * @param key
   * @param source
   */
  update<C = unknown>(key: KeyOf<S>, newV: S[KeyOf<S>], caller?: C): void
}

export type KeyOf<S> = keyof S
