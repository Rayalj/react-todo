// /src/AddTodoForm.jsx

import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

const AddTodoForm = ({ addTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== '') {
      const newTodo = {
        id: Date.now(), // Genera un identificador único
        title: todoTitle
      };
      addTodo(newTodo); 
      setTodoTitle(''); 
    }
  };
  
  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel 
        value={todoTitle}
        onChange={handleTitleChange}
      >
        Title:
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
