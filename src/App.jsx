import React, { Fragment, useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const key = 'savedTodoList';
  const initialState = JSON.parse(localStorage.getItem(key)) || [];
  const [todoList, setTodoList] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simular una llamada a una API o un proceso de carga de datos
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // Una vez que los datos se cargan con éxito, actualizamos el estado
        setTodoList(initialState);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setIsLoading(false); // En caso de error, también detenemos el indicador de carga
      }
    };

    fetchData();
  }, [initialState]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(key, JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  return (
    <Fragment>
      <h1>TO DO LIST </h1>
      <AddTodoForm addTodo={addTodo} />
      <hr />
      {isLoading ? <p>Cargando...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </Fragment>
  );
}

export default App;