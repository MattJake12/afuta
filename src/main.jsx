// src/main.jsx (ou src/index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Importar
import App from './App';
import GlobalStyle from './styles/GlobalStyle'; // Mantenha GlobalStyle aqui ou dentro de App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* // <-- Envolver App */}
      <GlobalStyle /> {/* // <-- Pode ficar aqui ou dentro de App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);