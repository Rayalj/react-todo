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
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
          }
        };
        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Observa la respuesta de la API de Airtable en la consola

        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.title
        }));

        console.log(todos); // Observa los todos transformados en la consola

        setTodoList(todos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Eliminamos todoList de la lista de dependencias

  const addTodo = async (newTodo) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
        },
        body: JSON.stringify({
          fields: {
            title: newTodo.title // Suponiendo que newTodo es un objeto con una propiedad 'title'
          }
        })
      };

      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();

      // Agregar la nueva tarea a todoList
      setTodoList([...todoList, { id: responseData.id, title: responseData.fields.title }]);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
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
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </Fragment>
  );
}

export default App;