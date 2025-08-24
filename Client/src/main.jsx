import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Space from './Space';
// import SpacePage from "./pages/SpacePage"

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/space/:id" element={<Space />} />
      {/* <Route path="/space/:id" element={<Space />} /> */}

    </Routes>
  </BrowserRouter>
);
