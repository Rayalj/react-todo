import React, { useState } from 'react';

const TodoListItem = ({ todo, onRemoveTodo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleRemoveClick = () => {
    onRemoveTodo(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleUpdateClick = () => {
    onUpdateTodo(todo.id, { title: newTitle });
    setIsEditing(false);
    
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input type="text" value={newTitle} onChange={handleTitleChange} />
          <button onClick={handleUpdateClick}>Update</button>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <button onClick={handleEditClick}>Update</button>
          <button onClick={handleRemoveClick}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoListItem;
