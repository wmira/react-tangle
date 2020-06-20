import * as React from 'react'
import { createContext } from '../src/tangle'
import { useTangledState, TangleProvider } from '../src'
import { render, screen, fireEvent } from '@testing-library/react'

interface TestObj {
  test: { key: string, count: number }
}

jest.useFakeTimers();

describe('react-tangle', () => {

  it('subscribers can subscribe and unsubscribe from events', () => {
    const ctx = createContext<TestObj>({} as TestObj)

    const subscriber = jest.fn()
    const unsub = ctx.subscribe('test', subscriber )

    ctx.update('test', { key: 'hey', count: 1 })
    jest.runAllTimers();

    unsub()

    ctx.update('test', { key: 'hey', count: 1 })

    jest.runAllTimers();

    expect(subscriber).toHaveBeenCalledTimes(1)
    expect(subscriber).toHaveBeenCalledWith({key: 'hey', count: 1}, undefined, undefined)

  })

  it('undefined initial will not crash us', () => {
    const ctx = createContext<TestObj>()

    const subscriber = jest.fn()
    const unsub = ctx.subscribe('test', subscriber )

    ctx.update('test', { key: 'hey', count: 1 })
    jest.runAllTimers();

    unsub()

    ctx.update('test', { key: 'hey', count: 1 })

    jest.runAllTimers();

    expect(subscriber).toHaveBeenCalledTimes(1)
    expect(subscriber).toHaveBeenCalledWith({key: 'hey', count: 1}, undefined, undefined)

    // run an update that is not there, we should not die
    ctx.update('someField' as any, {})
  })

  interface ITest {
    count: number
  }
  it('a tangle state gets updated on another component when changes in another', () => {
    const Comp1 = () => {
      const [count] = useTangledState<ITest, 'count'>('count', 0)

      return (
        <div title={`${count}`}>{count}</div>
      )
    }
    const Comp2 = () => {
      const [count, setCount] = useTangledState<ITest, 'count'>('count', 0)

      return (
        <div><button data-testid='button' onClick={() => setCount(count + 1)}/></div>
      )
    }

    render(
      <TangleProvider initial={{ count: 0 }}>
        <Comp1 />
        <Comp2 />
      </TangleProvider>
    )

    const btn = screen.getByTestId('button')    

    fireEvent.click(btn)
    jest.runAllTimers()

    expect(screen.getByTitle("1")).toBeDefined()

    fireEvent.click(btn)
    jest.runAllTimers()

    expect(screen.getByTitle("2")).toBeDefined()
  })

  it('empty initial objects will not make us crash', () => {
    const Comp1 = () => {
      const [count] = useTangledState<ITest, 'count'>('count', 0)

      return (
        <div title={`${count}`}>{count}</div>
      )
    }
    
    const Comp2 = () => {
      const [count, setCount] = useTangledState<ITest, 'count'>('count', undefined)
      const incrementCount = () => {
        setCount((current) => {
          if (current === undefined) {
            return 1
          }
          return current + 1
        })
      }

      return (
        <div><button data-testid='button' onClick={incrementCount}/></div>
      )
    }

    render(
      <TangleProvider>
        <Comp1 />
        <Comp2 />
      </TangleProvider>
    )

    const btn = screen.getByTestId('button')    

    fireEvent.click(btn)
    jest.runAllTimers()

    expect(screen.getByTitle("1")).toBeDefined()

    fireEvent.click(btn)
    jest.runAllTimers()
        
    expect(screen.getByTitle("2")).toBeDefined()
  })
})