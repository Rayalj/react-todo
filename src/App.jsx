import React, { Fragment, useEffect, useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import "./App.css";
import AddTodoForm from './components/AddTodoForm';
import Footer from './components/Footer'; // Importa el componente Footer
import TodoList from './components/TodoList';

function App() {
  const key = 'savedTodoList';
  const initialState = JSON.parse(localStorage.getItem(key)) || [];
  const [todoList, setTodoList] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
          }
        };
        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?sort[0][field]=title&sort[0][direction]=${sortOrder}`;
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
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

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
      showSavedMessage('Saved');
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
      showSavedMessage('Deleted');
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
      showSavedMessage('Updated');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(key, JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const showSavedMessage = (message) => {
    setMessageText(message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1500); // Ocultar el mensaje después de 1.5 segundos
  };

  return (
    <Router>
      <div className="app-container">
        {showMessage && <div className="saved-message">{messageText}</div>}
        <Fragment>
          <h1>TO DO LIST</h1>
          <div className="sort-button-container">
            <button className="sort-button" onClick={toggleSortOrder} title={`${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}>
              {sortOrder === 'asc' ? (
                <Fragment>
                  <FaSortUp size={18} color="white" />
                  <span className="sort-button-text">Ascen</span>
                </Fragment>
              ) : (
                <Fragment>
                  <FaSortDown size={18} color="white" />
                  <span className="sort-button-text">Descen</span>
                </Fragment>
              )}
            </button>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Fragment>
                  <AddTodoForm addTodo={addTodo} />
                  <hr />
                  {isLoading ? (
                    <ClipLoader size={50} color="#36ad47" />
                  ) : (
                    <TodoList todoList={todoList} onRemoveTodo={removeTodo} onUpdateTodo={updateTodo} />
                  )}
                </Fragment>
              }
            />
            <Route
              path="/new"
              element={<h1>New To Do List</h1>}
            />
          </Routes>
          <hr/>
          <Footer />
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
