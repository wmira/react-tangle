import * as React from 'react';
import { TangleProvider } from '../src/TangleProvider';
import { useTangledState } from '../src/useTangledState';

interface AppProps {}

interface ITodo {
  name: string
}

interface IAppState {
  todos: ITodo[]
}

export const Todos = () => {
  const [todos] = useTangledState<IAppState, 'todos'>('todos', [])

  return (
    <div>
      { todos.map( t => (<div key={t.name}>{t.name}</div>) )}
    </div>
  )
}


export const AddTodo = () => {

  const [todos, setTodos] = useTangledState<IAppState, 'todos'>('todos', [])
  const inputRef = React.useRef<any>()

  const addTodo = () => {
    setTodos(todos.concat([{ name: inputRef.current.value }]))
    inputRef.current.value = ""
    inputRef.current.value.focus()
  }

  return (
    <div>
      <input ref={inputRef}/><button onClick={addTodo}>Add</button>
    </div>
  )
}

function App({}: AppProps) {  
  return (
    <TangleProvider initial={{ todos: [{ name: 'Todo 1'}] }}>
      <Todos />
      <AddTodo />
    </TangleProvider>
  );
}

export default App;
