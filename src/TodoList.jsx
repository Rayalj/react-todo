import React from 'react';
import styles from './TodoList.module.css'; // Asegúrate de que este archivo existe y está correcto
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
}

export default TodoList;
