import { createContext } from './tangle'

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
})