import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/main.css';
import reportWebVitals from './reportWebVitals';
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';


const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();