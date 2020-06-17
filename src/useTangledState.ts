
type KeyOfState<S> = keyof S
type KeySetter<S, K extends keyof S> = (nextVal: S[K]) => void

function useTangledState<S>(key: KeyOfState<S>, defaultV?: S[KeyOfState<S>]): [S[KeyOfState<S>], KeySetter<S, KeyOfState<S>>] {
  const tangledContext = useTangledContext();  
}



