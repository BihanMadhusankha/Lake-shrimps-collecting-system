import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './page/signup';
import Landing from './page/landing';
import Login from './page/login';
import Footer from './Footer/fotter';
import Dashboard from './Admin/dashboard';
import AdminHome from './Admin/AdminHome';
import UserHome from './Users/userhome';
import SelerPage from './page/selerPage';
import VehicaleOwnerPage from './page/vehicaleOwnerPage';
// import ConCreatersPage from './page/contentCreaterPage';
import ShrimpColorMonitoring from './page/byColor'
import UserProfile from './Users/profile';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.js';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import EnvironmentPage from './stock&category/environment';
import DetailsPage from './stock&category/details';
import HarvestPage from './stock&category/harvest';
import HistoryPage from './stock&category/history';
import PlacesPage from './stock&category/places';
import VehicaleDetails from './delivery/VehicleDetails'
import VehicleList from './delivery/VehicleList'
import VehicaleUserForm from './delivery/VehicaleUserForm'
import RegForm from './delivery/RegForm'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      easing: 'ease-in-out-sine',
      once: true,
      mirror: false,
      delay: 100,
      offset: 100,

    });
  }, []);


  return (
    <div className="App">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SSABS/user/signup/" element={<Signup />} />
        <Route path="/SSABS/user/login" element={<Login />} />
        <Route path="/SSABS/admin/dashboard" element={<Dashboard />} />
        <Route path="/SSABS/admin/adminhome" element={<AdminHome />} />
        <Route path="/SSABS/user/userhome" element={<UserHome />} />
        <Route path='/SSABS/user/userhome/selerPage' element={<SelerPage />} />
        <Route path='/SSABS/user/userhome/vehicaleowner' element={<VehicaleOwnerPage />} />
        {/* <Route path='/SSABS/user/userhome/con.creaters' element={<ConCreatersPage />} /> */}
        <Route path='/SSABS/user/userhome/profile' element={<UserProfile />} />
        <Route path='/SSABS/user/userhome/byColor' element={<ShrimpColorMonitoring />} />
          <Route path='/SSABS/user/userhome/environment' element={<EnvironmentPage/>}/>
          <Route path='/SSABS/user/userhome/details' element={<DetailsPage/>}/>
          <Route path='/SSABS/user/userhome/harvest' element={<HarvestPage/>}/>
          <Route path='/SSABS/user/userhome/history' element={<HistoryPage/>}/>
          <Route path='/SSABS/user/userhome/places' element={<PlacesPage/>}/>
          <Route path='/SSABS/user/userhome/VehicaleDetails' element={<VehicaleDetails/>}/>
          <Route path='/SSABS/user/userhome/VehicleList' element={<VehicleList/>}/>
          <Route path='/SSABS/user/userhome/VehicaleUserForm' element={<VehicaleUserForm/>}/>
          <Route path='/SSABS/user/userhome/RegForm' element={<RegForm/>}/>
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
