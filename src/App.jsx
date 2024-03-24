import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList]= useState([]);
   
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  
  return (
    <div>
      <h1>To Do List</h1>
      <AddTodoForm addTodo={addTodo} />
      <hr />
      <TodoList todoList={todoList}/>

      
    </div>
  );
}

export default App;