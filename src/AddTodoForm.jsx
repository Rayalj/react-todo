import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'; // Importamos el icono faPenToSquare
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './AddTodoForm.css';
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
        id: Date.now(),
        title: todoTitle
      };
      addTodo(newTodo);
      setTodoTitle('');
    }
  };

  return (
    <form className='input-section' onSubmit={handleAddTodo}>
      <InputWithLabel 
        value={todoTitle}
        onChange={handleTitleChange}
      >
        <span>Title:</span>
      </InputWithLabel>
      <button type="submit" className="plus-icon">
        <FontAwesomeIcon icon={faPenToSquare} /> {/* Cambiamos el icono a faPenToSquare */}
      </button>
    </form>
  );
}

export default AddTodoForm;
