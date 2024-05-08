import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList, onRemoveTodo, onUpdateTodo }) => {
  return (
    <ul>
      {todoList.map(todo => (
        <TodoListItem 
          key={todo.id} 
          todo={todo} 
          onRemoveTodo={onRemoveTodo} 
          onUpdateTodo={onUpdateTodo} 
        />
      ))}
    </ul>
  );
}

export default TodoList;
