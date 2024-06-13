import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './TodoList.module.css';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList, onRemoveTodo, onUpdateTodo }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  // Calcula los índices de la primera y última tarea de la página actual
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  // Cambia a la siguiente página
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Cambia a la página anterior
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Renderiza los botones de navegación
  const renderPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todoList.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className={styles.pagination}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(todoList.length / todosPerPage)}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <ul className={styles.todoList}>
        {currentTodos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
      </ul>
      {todoList.length > todosPerPage && renderPaginationButtons()}
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoList;
