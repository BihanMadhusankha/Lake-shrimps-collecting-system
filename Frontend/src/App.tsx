import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './page/signup'; // Corrected path to Signup
import Landing from './page/landing'; // Corrected path to Landing
import Login from './page/login'; // Corrected';
import Footer from './page/fotter';
// import Dashboard from './page/dashboard';
import { Toaster } from 'react-hot-toast';
import CurrentUsers from './page/currentUsers';

function App() {
  return (
    <div className="App">
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/SSABS/user/signup/" element={<Signup />} />
          <Route path="/SSABS/user/login" element={<Login />} />
          <Route path="/SSABS/user/current" element={<CurrentUsers />} />

        </Routes>

      <Footer />
    </div>
  );
}

export default App;
