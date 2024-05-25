import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './page/signup';
import Landing from './page/landing';
import Login from './page/login';
import Footer from './Footer/fotter';

import AdminDashboard from './Admin/dashboard';
import ContentCreaterDashoard from './ContentCreater/ContentCreaterDashboard';
import VehicaleOwnerDashboard from './VehicaleOwners/VehicaleOwnerDashboard';
import UserHome from './Users/userhome';
import SelerDashboard from './Sealer/SealerDashboard';

import DaylyProducts from './LandingContent/DaylyProducts'

import Sealerhome from './Sealer/sealerhome';
import AddProductFormSealer from './Sealer/AddProductFormSealer';
import SealerProfile from './Sealer/selerProfile'
import SealerAllProducts from './Sealer/Dashboard'

import VehicaleRegistration from './VehicaleOwners/VeicaleOwnerPost'
import RegistedVehicale from './VehicaleOwners/RegisteredVehicles'

import SelerPage from './page/selerPage';


import VehicaleOwnerPage from './page/vehicaleOwnerPage';
import VehicleListPage from './VehicaleOwners/VehicleListPage';


import BookingForm from './VehicaleOwners/BookingForm';

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
import NotFound from './page/Notfounded';
import AdminUsers from './Admin/AdminUsers';
import Forgetpassword from './page/forgetpassword'
import ResetPassword from './page/ResetPassword'

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
        <Route path="/Notfounded" element={<NotFound />} />
        <Route path="/SSABS/user/signup/" element={<Signup />} />
        <Route path="/SSABS/user/login" element={<Login />} />
        <Route path="/SSABS/user/forgetpassword" element={<Forgetpassword />} />
        <Route path="/SSABS/user/resetPassword" element={<ResetPassword />} />

        {/* Dashboard */}
        <Route path="/SSABS/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/SSABS/content_creater/dashboard" element={<ContentCreaterDashoard />} />
        <Route path="/SSABS/vehicale_owner/dashboard" element={<VehicaleOwnerDashboard />} />
        <Route path="/SSABS/seler/dashboard" element={<SelerDashboard />} />
        <Route path="/SSABS/user/userhome" element={<UserHome />} />



        {/* users home pages */}
        <Route path="/SSABS/user/userhome" element={<UserHome />} />
        <Route path="/SSABS/seler/selerhome" element={<Sealerhome />} />
        <Route path="/SSABS/user/daylyproducts" element={<DaylyProducts />} />








        <Route path="/SSABS/seler/products" element={<AddProductFormSealer />} />
        <Route path="/SSABS/seler/allpost" element={<SealerAllProducts />} />

        <Route path="/SSABS/seler/profile" element={<SealerProfile />} />
        
       
        <Route path="/SSABS/vehicaleOwn/products" element={<VehicaleRegistration />} />
        <Route path="/SSABS/vehicaleOwn/allpost" element={<RegistedVehicale />} />
        <Route path="/user/book-vehicle/:vehicleId" element={<BookingForm />} />
       



        <Route path="/SSABS/admin/allusers" element={<AdminUsers />} />
        <Route path='/SSABS/selerPage' element={<SelerPage />} />


        <Route path='/SSABS/vehicaleowner' element={<VehicaleOwnerPage />} />
        <Route path='/SSABS/vehicle-owner' element={<VehicleListPage />} />

        

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
