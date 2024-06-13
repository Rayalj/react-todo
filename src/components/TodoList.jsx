import PropTypes from 'prop-types';
import React from 'react';
import styles from './TodoList.module.css'; // Asegúrate de que esta ruta sea correcta
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList, onRemoveTodo, onUpdateTodo }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.todoList}>
        {todoList.map(todo => (
          <TodoListItem 
            key={todo.id} 
            todo={todo} 
            onRemoveTodo={onRemoveTodo} 
            onUpdateTodo={onUpdateTodo} 
          />
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoList;
