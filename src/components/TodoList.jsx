import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './TodoList.module.css';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList, onRemoveTodo, onUpdateTodo }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 4;

  // Calcula los índices de los todos que se mostrarán en la página actual
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  // Maneja el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Renderiza los botones de paginación
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(todoList.length / todosPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const maxButtonsToShow = 5; // Número máximo de botones de página visibles
    const pageButtons = [];

    if (totalPages <= maxButtonsToShow) {
      pageButtons.push(...pageNumbers);
    } else {
      if (currentPage <= 3) {
        pageButtons.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageButtons.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageButtons.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return (
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Prev
        </button>
        {pageButtons.map((number, index) => (
          <button
            key={index}
            onClick={() => typeof number === 'number' && handlePageChange(number)}
            className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
            disabled={typeof number !== 'number'}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
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
