import React, { Fragment, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

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

        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.title
        }));

        setTodoList(todos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
            title: newTodo.title
          }
        })
      };

      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
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
    <Router>
      <div className="app-container">
        <Fragment>
          <h1>TO DO LIST</h1>
          <Routes>
            <Route
              path="/"
              element={
                <Fragment>
                  <AddTodoForm addTodo={addTodo} />
                  <hr />
                  {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} />}
                </Fragment>
              }
            />
            <Route
              path="/new"
              element={<h1>Nueva lista de tareas pendientes</h1>}
            />
          </Routes>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;

