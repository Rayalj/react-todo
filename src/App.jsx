import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [newTodo, setNewTodo] = useState('');


  return (
    <div>
      <h1>To Do List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>new todo:<strong>{newTodo}</strong></p>
      <hr />
      <TodoList/>
      
    </div>
  );
}

export default App;
