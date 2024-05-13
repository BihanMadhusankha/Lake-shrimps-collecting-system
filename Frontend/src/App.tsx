import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './page/signup'; 
import Landing from './page/landing'; 
import Login from './page/login';
import Footer from './page/fotter';
 import Dashboard from './Admin/dashboard';
 import AdminHome from './Admin/AdminHome';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/SSABS/user/signup/" element={<Signup />} />
          <Route path="/SSABS/user/login" element={<Login />} />
          <Route path="/SSABS/user/dashboard" element={<Dashboard />} />
          <Route path="/SSABS/user/adminhome" element={<AdminHome />} />

        </Routes>

      <Footer />
    </div>
  );
}

export default App;
