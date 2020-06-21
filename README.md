# react-tangle

[![codecov](https://codecov.io/gh/wmira/react-tangle/branch/master/graph/badge.svg)](https://codecov.io/gh/wmira/react-tangle)
[![npm version](https://badge.fury.io/js/react-tangle.svg)](https://badge.fury.io/js/react-tangle)


A simple react app state management library. 

## Motivation

Use it to make it quickly provide shared state for your React projects and ideal for rapid application prototyping.
Reduces most boilerplates and just share state between components directly.

## Example

1. [TodoMvC](https://codesandbox.io/s/sad-bash-sykqy)
2. [Binance 24h Prices] https://2c4ks.csb.app
3. [Binance 24h Prices - Source ] https://codesandbox.io/s/ecstatic-leavitt-2c4ks?file=/src/App.tsx

## Basic

```
  npm install react-tangle

```

Then you need to render your app enclosed in a TangleProvider.

```javascript

return (
  <TangleProvider initialValue={{}}>
    <App/>
  </TangleProvider>
)

```

To use a shared state between 2 components, use the useTangledState hook

```javascript
  import { useTangledState } from 'react-tangle'

  // here App
  const TodosList = () => {
    const [todos] = useTangledState('todos', [])

    return (
      <div>
        { todos.map(todo => (<div key={todo}>{todo}</div>))}
      </div>
    )
  }

  const AddTodo = () => {
    const [todos, setTodos] = useTangledState('todos', [])

    const onAdd = (todo: string) => {
      setTodos((current) => {
        return current.concat([todo]) // todos under TodosList should update
      })
    }
    return (
      <div>
        <AddTodoComponent onAdd={onAdd}/>
      </div>
    )
  }


```

## License

MIT

## Others

Thanks to [@tmcw](https://github.com/tmcw) for providing the react-tangle npm package
