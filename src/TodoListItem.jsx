import React from 'react';

const TodoListItem = ({ title, onRemoveTodo }) => {
  return (
    <li>
      {title}
      <button onClick={onRemoveTodo} > Delete</button>
    </li>
  );
}

export default TodoListItem;