// src/App.jsx

import React from 'react';

function App() {
  const todoList = [
    { id: 1, title: 'Complete assignment 1' },
    { id: 2, title: 'Complete assignment 2' },
    { id: 3, title: 'Complete assignment 3' },
  ];
  
  return (
    <div>
      <h1>Lista de tareas Pendientes</h1>
      <ul>
        {todoList.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
