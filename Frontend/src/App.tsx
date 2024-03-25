import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './signup/signup';
import Landing from './page/landing'; 
// import About from './about/about'; 
import Footer from './page/fotter'; // 

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer /> 
    </div>
  );
}

export default App;