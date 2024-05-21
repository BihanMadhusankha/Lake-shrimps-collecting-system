import React from 'react';
import '../CSS/UserForm.css';
import PrawnsImage from './../assets/prawn1.jpg';
import UserNavigation from '../Navigations/userNav';


const UserForm: React.FC = () => {
  return (
    <div>
      <UserNavigation/>
    
    <div className="background">
             <img src={PrawnsImage}alt="Image" className="Image-container" style={{ width: '50%', height: 'auto' }} />
    <div className="container">
      <div className="form-wrapper">
        <h2 className="title">Fill The Form</h2>
        <form className="form">
          <input type="text" placeholder="First name" className="input" />
          <input type="text" placeholder="Last name" className="input" />
          <input type="text" placeholder="NIC" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Address" className="input" />
          <input type="text" placeholder="Contact Number" className="input" />
          <input type="text" placeholder="Contact Number" className="input" />
          <button type="button" className="button">Submit</button>
          
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};

export default UserForm;