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

// import Sealerhome from './Sealer/sealerhome';
import AddProductFormSealer from './Sealer/AddProductFormSealer';
import SealerAllProducts from './Sealer/Dashboard'

import VehicaleRegistration from './VehicaleOwners/VeicaleOwnerPost'
import RegistedVehicale from './VehicaleOwners/RegisteredVehicles'

import SelerPage from './page/selerPage';


import VehicaleOwnerPage from './page/vehicaleOwnerPage';
import VehicleListPage from './VehicaleOwners/VehicleListPage';


import BookingForm from './VehicaleOwners/BookingForm';

import SellerRequestHistory from './Sealer/SellerRequestHistory'
// import ConCreatersPage from './page/contentCreaterPage';
import ShrimpColorMonitoring from './page/byColor'
import UserProfile from './Users/profile';
import Contentcraterprofile from './ContentCreater/contentcraterprofile';
import ConCreatersPage from './page/contentCreaterPage';
import Instructorspage from './ContentCreater/InstructorsPage';
import Instructorprofile from './page/InstructorProfile';
import Instructorvideos from './page/Instructorvideos';
import Instructoruploaddeatils from './ContentCreater/InstructoruploadDeatils';
import Classpost from './page/classpost';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.js';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import VehicleList from './delivery/VehicleList'

import NotFound from './page/Notfounded';
import AdminUsers from './Admin/AdminUsers';
import Forgetpassword from './Forgetpassword/forgetpassword'
import ResetPassword from './Forgetpassword/ResetPassword'
import SellerProfile from './Sealer/selerProfile';
import VehicleOwnerProfile from './VehicaleOwners/vehicleOwnerProfile';
import AdminProfile from './Admin/AdminProfile';
import AllTransaction from './Admin/AllTransaction'
import UploadedContent from './ContentCreater/UploadedContent'

function App() {
  // State to store the logged-in seller ID

  useEffect(() => {
    AOS.init({
      duration: 2000,
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


        <Route path="/SSABS/user/daylyproducts" element={<DaylyProducts />} />
        <Route path="/SSABS/seler/products" element={<AddProductFormSealer />} />
        <Route path="/SSABS/seler/allpost" element={<SealerAllProducts />} />
        <Route path="/SSABS/sellers/requests" element={<SellerRequestHistory />} />
        <Route path="/SSABS/seler/profile" element={<SellerProfile />} />
        <Route path='/SSABS/selerPage' element={<SelerPage />} />


        <Route path="/SSABS/vehicaleOwn/products" element={<VehicaleRegistration />} />
        <Route path="/SSABS/vehicaleOwn/allpost" element={<RegistedVehicale />} />
        <Route path="/user/book-vehicle/:vehicleId" element={<BookingForm />} />
        <Route path='/SSABS/vehicaleowner' element={<VehicaleOwnerPage />} />
        <Route path='/SSABS/vehicle-owner' element={<VehicleListPage />} />
        <Route path='/SSABS/vehicaleOwn/profile' element={<VehicleOwnerProfile />} />


        <Route path="/SSABS/admin/allusers" element={<AdminUsers />} />

        <Route path='/SSABS/admin/profile' element={<AdminProfile />} />

        <Route path='/SSABS/user/userhome/profile' element={<UserProfile />} />
        <Route path='/SSABS/user/userhome/byColor' element={<ShrimpColorMonitoring />} />
       
      </Routes>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        
        
        <Route path='/SSABS/user/userhome/con.creaters' element={<ConCreatersPage />} />
        <Route path='/SSABS/user/userhome/FindINSTRUCTORS' element={<Instructorspage />} />
        <Route path='/SSABS/user/userhome/courses' element={<Instructorprofile />} />
        <Route path='/SSABS/user/userhome/video' element={<Instructorvideos />} />
        <Route path='/SSABS/instructer/uploadfile' element={<Instructoruploaddeatils />} />
        
        <Route path='/SSABS/user/userhome/Classpost' element={<Classpost />} />


        <Route path='/SSABS/admin/alltransaction' element={<AllTransaction />} />
        <Route path='/SSABS/contentcreater/profile' element={<Contentcraterprofile />} />
        <Route path='/SSABS/contentcreater/uploadedpost' element={<UploadedContent />} />


      </Routes>
      <Footer />
    </div>
  );
}
export default App;
