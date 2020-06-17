
export const useTangledSubstate = () => {
  const [tangledState] = useTangledState('a')
  const [subState] = tangledContext.tangle(tangledState)


  setState((tangle) => {
    const {current} = tangledState
    const nextState = tangledState.next()
    
    nextState.name = "Warren"

    return current
  })
}