
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './page/signup';
import Landing from './page/landing';
// import About from './about/about'; // Assuming About component is not used
import Footer from './page/fotter';
import Login from './page/login';
import Dashboard from './page/dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='App'>
      <Toaster position='bottom-right' toastOptions={{duration:2000}}></Toaster>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SSABS/user/signup/" element={<Signup />} />
        <Route path="/SSABS/user/login" element={<Login />} />
        <Route path="/SSABS/user/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
