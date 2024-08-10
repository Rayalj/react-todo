import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './TodoListItem.module.css';

const TodoListItem = ({ todo, onRemoveTodo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleRemoveClick = () => {
    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      onRemoveTodo(todo.id);
    }
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
          <button onClick={handleUpdateClick}>
            <FontAwesomeIcon icon={faEdit} /> Update
          </button>
        </>
      ) : (
        <>
          <span className={styles.Descripcion}>{todo.title}</span>
          <div className={styles.buttonContainer}>
            <button onClick={handleEditClick} className={styles.editTask}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className={styles.removeTask} onClick={handleRemoveClick}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
