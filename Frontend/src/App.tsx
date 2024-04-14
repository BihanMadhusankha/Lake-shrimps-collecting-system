import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './page/signup';
import Landing from './page/landing'; 
// import About from './about/about'; 
import Footer from './page/fotter';
import Login from './page/login';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer /> 
    </div>
  );
}

export default App;