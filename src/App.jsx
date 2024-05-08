import React, { Fragment, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route desde react-router-dom
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
        console.log(data); // respuesta de la API de Airtable en la consola

        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.title
        }));

        console.log(todos); // todos transformados en la consola

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

  const removeTodo = async (id) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
        }
      };

      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTodoList(todoList.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
        },
        body: JSON.stringify({
          fields: updatedTodo
        })
      };

      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();

      setTodoList(todoList.map(todo => todo.id === id ? { ...todo, title: responseData.fields.title } : todo));
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(key, JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  return (
    
    <Router> {/* Envuelve todo en el BrowserRouter */}
      <Fragment>
        <h1>TO DO LIST </h1>

        {/* Routes para las diferentes rutas */}
        <Routes>
          {/* Ruta para la lista de tareas */}
          <Route
            path="/" // Ruta raíz
            element={ // Elemento para renderizar
              <Fragment>
                <AddTodoForm addTodo={addTodo} />
                <hr />
                {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} />}
              </Fragment>
            }
          />
          {/* Nueva ruta para la creación de nuevas tareas */}
          <Route
            path="/new" // Ruta para crear nuevas tareas
            element={<h1>Nueva lista de tareas pendientes</h1>} // Elemento para renderizar
          />
        </Routes>

      </Fragment>
    </Router>
  );
}

export default App;