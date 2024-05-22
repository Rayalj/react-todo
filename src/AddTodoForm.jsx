// /src/AddTodoForm.jsx

import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './TodoList.module.css';
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
    <div className={styles.addf}>
    <form className={styles.addTodoForm} onSubmit={handleAddTodo}>

      <InputWithLabel 
        value={todoTitle}
        onChange={handleTitleChange}
      >
        <span className={styles.title}>Title:</span>
      </InputWithLabel>
      <button type="submit" >ADD TODO</button>
    </form>
    </div>
  );
}

export default AddTodoForm;
