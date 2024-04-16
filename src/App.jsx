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

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <Fragment>
      <h1>To Do List</h1>
      <AddTodoForm addTodo={addTodo} />
      <hr />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </Fragment>
  );
}

export default App;