import Div100vh from 'react-div-100vh';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Div100vh className='root'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Div100vh>,
);
