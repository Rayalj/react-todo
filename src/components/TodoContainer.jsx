import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import './TodoContainer.css';
import TodoList from './TodoList';

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (todoId) => {
    const filteredTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(filteredTodos);
  };

  const updateTodo = (todoId, updatedTodo) => {
    const updatedTodos = todos.map(todo => 
      todo.id === todoId ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} />
    </div>
  );
};

TodoContainer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default TodoContainer;