import React, { useState } from 'react';
import styles from './TodoListItem.module.css';

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
    <li className={styles.ListItem}>
      {isEditing ? (
        <>
          <input type="text" value={newTitle} onChange={handleTitleChange} />
          <button onClick={handleUpdateClick}>Update</button>
        </>
      ) : (
        <>
          <span className={styles.Descripcion}>{todo.title}</span>
          <button onClick={handleEditClick}>Update</button>
          <button onClick={handleRemoveClick}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoListItem;
