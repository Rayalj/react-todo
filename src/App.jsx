import React, { Fragment, useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function useSemiPersistentState(key, initialState) {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState('savedTodoList', []);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  
  return (
    <Fragment>
      <h1>To Do List</h1>
      <AddTodoForm addTodo={addTodo} />
      <hr />
      <TodoList todoList={todoList}/>
    </Fragment>
  );
}

export default App;