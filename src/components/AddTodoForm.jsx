import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
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
        id: Date.now(), // Generamos un ID único basado en la fecha actual
        title: todoTitle
      };
      addTodo(newTodo);
      setTodoTitle('');
    }
  };

  return (
    <form className='input-section' onSubmit={handleAddTodo}>
      <InputWithLabel 
        id="todoTitle" // Añadimos un atributo id para mejorar la accesibilidad
        value={todoTitle}
        onChange={handleTitleChange}
      >
        <span>Title:</span>
      </InputWithLabel>
      <button type="submit" className="plus-icon" aria-label="Add Todo">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </form>
  );
};

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
