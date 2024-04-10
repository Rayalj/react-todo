import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <ul>
      {todoList.map(todo => (
        <TodoListItem 
          key={todo.id} 
          title={todo.title} 
          onRemoveTodo={() => onRemoveTodo(todo.id)} // Pasando la función con el ID como argumento
        />
      ))}
    </ul>
  );
}

export default TodoList;