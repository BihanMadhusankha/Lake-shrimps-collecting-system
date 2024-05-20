import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './page/signup'; 
import Landing from './page/landing'; 
import Login from './page/login';
import Footer from './page/fotter'; // Corrected import
import Dashboard from './Admin/dashboard';
import AdminHome from './Admin/AdminHome';
import UserHome from './Users/userhome';
import SelerPage from './page/selerPage';
import VehicaleOwnerPage from './page/vehicaleOwnerPage'; // Corrected import
import ContentCreaterPage from './page/contentCreaterPage'; // Corrected import
import ProfilePage from './Users/profile';
import { Toaster } from 'react-hot-toast';
import RegForm from './delivery/RegForm';
import VehicleList from './delivery/VehicleList';
import VehicleDetails from './delivery/VehicleDetails'
import UserForm from './delivery/UserForm';




function App() {
  return (
    <div className="App">
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/SSABS/user/signup" element={<Signup />} />
          <Route path="/SSABS/user/login" element={<Login />} />
          <Route path="/SSABS/admin/dashboard" element={<Dashboard />} />
          <Route path="/SSABS/admin/adminhome" element={<AdminHome />} />
          <Route path="/SSABS/user/userhome" element={<UserHome />} />
          <Route path="/SSABS/user/userhome/selerPage" element={<SelerPage />} />
          <Route path="/SSABS/user/userhome/vehicaleowner" element={<VehicaleOwnerPage />} />
          <Route path="/SSABS/user/userhome/contentcreaters" element={<ContentCreaterPage />} />
          <Route path="/SSABS/user/userhome/profile" element={<ProfilePage />} />
          <Route path="/SSABS/user/userhome/RegForm" element={<RegForm />} />
          <Route path="/SSABS/user/VehicleList" element={<VehicleList />} />
          <Route path="/SSABS/user/VehicleDetails" element={<VehicleDetails />} />
          <Route path="/SSABS/user/UserForm" element={<UserForm />} />

          
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
