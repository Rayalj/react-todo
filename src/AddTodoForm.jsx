import React, { useState } from 'react';
const AddTodoForm = (props) => {

  const { onAddTodo } = props;

  const [todoTitle, setTodoTitle]= useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();

    const todoTitle = event.target.title.value;

    console.log(todoTitle);

    event.target.reset();
    onAddTodo(todoTitle);

  };

  return (
    <form onSubmit={handleAddTodo}>
    <label htmlFor="todoTitle">Title: </label>
      <input type="text" id="todoTitle" name="title" />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;