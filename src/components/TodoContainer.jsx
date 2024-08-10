import PropTypes from 'prop-types';
import React from 'react';
import AddTodoForm from './AddTodoForm';
import './TodoContainer.css';
import TodoList from './TodoList';

const TodoContainer = ({ todoList, addTodo, removeTodo, updateTodo }) => {
  return (
    <div className="todo-container">
      <AddTodoForm addTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} />
    </div>
  );
};

TodoContainer.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default TodoContainer;
