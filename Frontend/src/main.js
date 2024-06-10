import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './page/AuthContext';
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(BrowserRouter, null,
    React.createElement(React.StrictMode, null,
        React.createElement(AuthProvider, null,
            React.createElement(App, null)))));
