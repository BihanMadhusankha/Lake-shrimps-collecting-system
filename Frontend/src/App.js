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
import DaylyProducts from './LandingContent/DaylyProducts';
// import Sealerhome from './Sealer/sealerhome';
import AddProductFormSealer from './Sealer/AddProductFormSealer';
import SealerAllProducts from './Sealer/Dashboard';
import VehicaleRegistration from './VehicaleOwners/VeicaleOwnerPost';
import RegistedVehicale from './VehicaleOwners/RegisteredVehicles';
import SelerPage from './page/selerPage';
import VehicaleOwnerPage from './page/vehicaleOwnerPage';
import VehicleListPage from './VehicaleOwners/VehicleListPage';
import BookingForm from './VehicaleOwners/BookingForm';
import SellerRequestHistory from './Sealer/SellerRequestHistory';
// import ConCreatersPage from './page/contentCreaterPage';
import ShrimpColorMonitoring from './page/byColor';
import UserProfile from './Users/profile';
import Contentcraterprofile from './ContentCreater/contentcraterprofile';
import ConCreatersPage from './page/contentCreaterPage';
import Instructorspage from './page/InstructorsPage';
import Instructorprofile from './page/InstructorProfile';
import Instructorvideos from './page/Instructorvideos';
import Instructoruploaddeatils from './page/InstructoruploadDeatils';
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
import Forgetpassword from './page/forgetpassword';
import ResetPassword from './page/ResetPassword';
import SellerProfile from './Sealer/selerProfile';
import VehicleOwnerProfile from './VehicaleOwners/vehicleOwnerProfile';
import AdminProfile from './Admin/AdminProfile';
import AllTransaction from './Admin/AllTransaction';
import UploadedContent from './ContentCreater/UploadedContent';
function App() {
    // State to store the logged-in seller ID
    useEffect(function () {
        AOS.init({
            duration: 2000,
            easing: 'ease-in-out-sine',
            once: true,
            mirror: false,
            delay: 100,
            offset: 100,
        });
    }, []);
    return (React.createElement("div", { className: "App" },
        React.createElement(Toaster, { position: "top-center", toastOptions: { duration: 2000 } }),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Landing, null) }),
            React.createElement(Route, { path: "/Notfounded", element: React.createElement(NotFound, null) }),
            React.createElement(Route, { path: "/SSABS/user/signup/", element: React.createElement(Signup, null) }),
            React.createElement(Route, { path: "/SSABS/user/login", element: React.createElement(Login, null) }),
            React.createElement(Route, { path: "/SSABS/user/forgetpassword", element: React.createElement(Forgetpassword, null) }),
            React.createElement(Route, { path: "/SSABS/user/resetPassword", element: React.createElement(ResetPassword, null) }),
            React.createElement(Route, { path: "/SSABS/admin/dashboard", element: React.createElement(AdminDashboard, null) }),
            React.createElement(Route, { path: "/SSABS/content_creater/dashboard", element: React.createElement(ContentCreaterDashoard, null) }),
            React.createElement(Route, { path: "/SSABS/vehicale_owner/dashboard", element: React.createElement(VehicaleOwnerDashboard, null) }),
            React.createElement(Route, { path: "/SSABS/seler/dashboard", element: React.createElement(SelerDashboard, null) }),
            React.createElement(Route, { path: "/SSABS/user/userhome", element: React.createElement(UserHome, null) }),
            React.createElement(Route, { path: "/SSABS/user/daylyproducts", element: React.createElement(DaylyProducts, null) }),
            React.createElement(Route, { path: "/SSABS/seler/products", element: React.createElement(AddProductFormSealer, null) }),
            React.createElement(Route, { path: "/SSABS/seler/allpost", element: React.createElement(SealerAllProducts, null) }),
            React.createElement(Route, { path: "/SSABS/sellers/requests", element: React.createElement(SellerRequestHistory, null) }),
            React.createElement(Route, { path: "/SSABS/seler/profile", element: React.createElement(SellerProfile, null) }),
            React.createElement(Route, { path: '/SSABS/selerPage', element: React.createElement(SelerPage, null) }),
            React.createElement(Route, { path: "/SSABS/vehicaleOwn/products", element: React.createElement(VehicaleRegistration, null) }),
            React.createElement(Route, { path: "/SSABS/vehicaleOwn/allpost", element: React.createElement(RegistedVehicale, null) }),
            React.createElement(Route, { path: "/user/book-vehicle/:vehicleId", element: React.createElement(BookingForm, null) }),
            React.createElement(Route, { path: '/SSABS/vehicaleowner', element: React.createElement(VehicaleOwnerPage, null) }),
            React.createElement(Route, { path: '/SSABS/vehicle-owner', element: React.createElement(VehicleListPage, null) }),
            React.createElement(Route, { path: '/SSABS/vehicaleOwn/profile', element: React.createElement(VehicleOwnerProfile, null) }),
            React.createElement(Route, { path: "/SSABS/admin/allusers", element: React.createElement(AdminUsers, null) }),
            React.createElement(Route, { path: '/SSABS/admin/profile', element: React.createElement(AdminProfile, null) }),
            React.createElement(Route, { path: '/SSABS/user/userhome/profile', element: React.createElement(UserProfile, null) }),
            React.createElement(Route, { path: '/SSABS/user/userhome/byColor', element: React.createElement(ShrimpColorMonitoring, null) })),
        React.createElement(Toaster, { position: "top-center", toastOptions: { duration: 2000 } }),
        React.createElement(Routes, null,
            React.createElement(Route, { path: '/SSABS/user/userhome/con.creaters', element: React.createElement(ConCreatersPage, null) }),
            React.createElement(Route, { path: '/SSABS/user/userhome/FindINSTRUCTORS', element: React.createElement(Instructorspage, null) }),
            React.createElement(Route, { path: '/SSABS/user/userhome/courses', element: React.createElement(Instructorprofile, null) }),
            React.createElement(Route, { path: '/SSABS/user/userhome/video', element: React.createElement(Instructorvideos, null) }),
            React.createElement(Route, { path: '/SSABS/instructer/uploadfile', element: React.createElement(Instructoruploaddeatils, null) }),
            React.createElement(Route, { path: '/SSABS/user/userhome/Classpost', element: React.createElement(Classpost, null) }),
            React.createElement(Route, { path: '/SSABS/admin/alltransaction', element: React.createElement(AllTransaction, null) }),
            React.createElement(Route, { path: '/SSABS/contentcreater/profile', element: React.createElement(Contentcraterprofile, null) }),
            React.createElement(Route, { path: '/SSABS/contentcreater/uploadedpost', element: React.createElement(UploadedContent, null) })),
        React.createElement(Footer, null)));
}
export default App;
