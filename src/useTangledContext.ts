import { TangleContext } from "./TangleProvider"
import * as React from 'react'
import { ITangleContext } from "./types"

export const useTangledContext = <S>(): ITangleContext<S> => {
  return React.useContext(TangleContext)
}
