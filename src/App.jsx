import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { AppRoutes } from './Routes/AppRoutes.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppRoutes/>
    </React.StrictMode>
);
