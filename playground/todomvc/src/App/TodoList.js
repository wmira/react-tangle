import React, { useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import useRouter from "use-react-router";

import useInput from "./useInput";
import useOnEnter from "./useOnEnter";
import TodoItem from "./TodoItem";
import { useTangledState } from "react-tangle";
import { guid } from "../utils";

export const newTodo = label => ({
  done: false,
  id: guid(),
  label: (label || "").trim()
});

export default function TodoList() {
  const router = useRouter();

  const [todos, setTodos] = useTangledState('todos', [])

  React.useEffect(
    () => {                 
      setTodos(() => {
        return JSON.parse(localStorage.getItem("todos") || "[]")
      }) 
      
    },
    []
  )
  React.useEffect(
    () => {                  
      localStorage.setItem("todos", JSON.stringify(todos))      
    },
    [todos]
  )

  const left = useMemo(() => todos.reduce((p, c) => p + (c.done ? 0 : 1), 0), [
    todos
  ]);

  const visibleTodos = useMemo(
    () =>
      router.match.params.filter
        ? todos.filter(i =>
            router.match.params.filter === "active" ? !i.done : i.done
          )
        : todos,
    [todos, router.match.params.filter]
  );

  const anyDone = useMemo(() => todos.some(i => i.done), [todos]);
  const allSelected = useMemo(() => visibleTodos.every(i => i.done), [
    visibleTodos
  ]);

  const onToggleAll = () => {    
    setTodos(() => todos.map(todo => todo.done ? todo : { ...todo, done: true }))
  }

  const onClearCompleted = useCallback(
    () => {
      setTodos(current => current.filter(todo => !todo.done))        
    },
    [todos]
  );

  const [newValue, onNewValueChange, setNewValue] = useInput();
  const onAddTodo = useOnEnter(
    () => {
      if (newValue) {
        setTodos(current => {
          return current.concat([ newTodo(newValue)])
        })
        setNewValue("")
      }
    },
    [newValue]
  );

  return (
    <React.Fragment>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyPress={onAddTodo}
          value={newValue}
          onChange={onNewValueChange}
        />
      </header>

      <section className="main">
        <input
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
          checked={allSelected}
          onChange={onToggleAll}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{left}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <NavLink exact={true} to="/" activeClassName="selected">
              All
            </NavLink>
          </li>
          <li>
            <NavLink to="/active" activeClassName="selected">
              Active
            </NavLink>
          </li>
          <li>
            <NavLink to="/completed" activeClassName="selected">
              Completed
            </NavLink>
          </li>
        </ul>
        {anyDone && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    </React.Fragment>
  );
}
