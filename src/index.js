// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import ClientScreen from './pages/ClientScreen';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClientScreen />
  </React.StrictMode>
);