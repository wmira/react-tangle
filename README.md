# react-tangle

A simple react app state management library. 

## Motivation

Use it to make it quickly provide shared state for your React projects and ideal on quick application prototyping.
Reduces most boilerplates and just share state between components directly.

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
