import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos]= useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return
    console.log(name);
    setTodos(prevTodos => {
      return [...prevTodos, {
        id: uuidv4(),
        name: name,
        complete: false
      }]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    let newTodos = [...todos];
    newTodos.length = 0;
    setTodos(newTodos)
  }

  function PercentageDone() {
    let percentDone;
    if (todos.length === 0) {
      percentDone = `Add tasks`;
    } else{
      let percent = ((todos.filter(todo => todo.complete).length) / todos.length) * 100;
      percentDone = `${percent}% done`
    }
    return percentDone;
  }

  return (
    <div>
      <h3 className="text-center text-dark my-3">Hi, let's help you track your task progress...</h3>
      <div className="border border-secondary rounded p-5">
        <TodoList todos={todos}  toggleTodo={toggleTodo} />
        <form className="form-inline">
          <input className="form-control mx-1 my-2" ref={todoNameRef} type="text" id="taskInput"/>
          <button className="btn btn-primary mx-1 my-2" onClick={handleAddTodo}>Add Todo</button>
          <button className="btn btn-danger mx-1 my-2" onClick={handleClearTodos}>Clear All</button>
        </form>
        <div className="w-100 bg-success text-light text-center form-control font-weight-bold my-1">
          <PercentageDone percentDone={PercentageDone}/>
        </div>
      </div>
    </div>
  );
}

export default App;
