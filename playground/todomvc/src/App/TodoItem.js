import React, { useCallback, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";

import useDoubleClick from "./useDoubleClick";
import useOnEnter from "./useOnEnter";
import { useTangledState } from "react-tangle";

const copyAndFindTodo = (todos, id) => {
  //const copy = [...todos]
  const idx = todos.findIndex(t => t.id === id)
  const todo = todos[idx]
  if (todo) {
    return { todos: [...todos], idx, todo }
  }
  return {}
}

const updateLabel = (todos, id, label) => {  
  const { todos: todosCopy, idx, todo: toUpdate } = copyAndFindTodo(todos, id)
  if (toUpdate) {
    const copyOfTodo = { ...toUpdate }
    copyOfTodo.label = label
    todosCopy[idx] = copyOfTodo
    return todosCopy
  }
  return todos
}

const deleteTodo = (todos, id) => {
  const { todos: todosCopy, idx, todo: toUpdate } = copyAndFindTodo(todos, id)
  console.log("deleting ", todosCopy, idx)
  if (toUpdate) {    
    todosCopy.splice(idx,1)
    return todosCopy
  }
  return todos
}

export default function TodoItem({ todo }) {
  // const [, { deleteTodo }] = useTodos(() => null);
  const [todos, setTodos] = useTangledState("todos")

  const [editing, setEditing] = useState(false);

  const onDelete = () => {
    setTodos(deleteTodo(todos, todo.id))
  }
  const onDone = () => {
    const newTodos = [ ...todos ]
    const idx = newTodos.findIndex(c => todo.id === c.id)
    const todoToUpdate = newTodos[idx]
    todoToUpdate.done = !todoToUpdate.done
    setTodos(newTodos)    
  }
  const onChange = event => {    
    setTodos(updateLabel(todos, todo.id, event.target.value))    
    //setLabel(todo.id, event.target.value)
  }


  const handleViewClick = useDoubleClick(null, () => setEditing(true));
  const finishedCallback = useCallback(
    () => {
      setEditing(false);      
      setTodos(updateLabel(todos, todo.id, todo.label.trim()))    
    },
    [todo]
  );

  const onEnter = useOnEnter(finishedCallback, [todo]);
  const ref = useRef();
  useOnClickOutside(ref, finishedCallback);

  return (
    <li
      onClick={handleViewClick}
      className={`${editing ? "editing" : ""} ${todo.done ? "completed" : ""}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.done}
          onChange={onDone}
          autoFocus={true}
        />
        <label>{todo.label}</label>
        <button className="destroy" onClick={onDelete} />
      </div>
      {editing && (
        <input
          ref={ref}
          className="edit"
          value={todo.label}
          onChange={onChange}
          onKeyPress={onEnter}
        />
      )}
    </li>
  );
}
