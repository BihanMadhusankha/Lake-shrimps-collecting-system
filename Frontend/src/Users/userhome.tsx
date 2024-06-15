import React, { useState, useEffect } from 'react';
import UsersLAnding from '../LandingContent/UsersLAnding';
import UserNavigation from '../Navigations/userNav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get('http://localhost:5001/SSABS/user/userhome', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.data) {
          setIsLoggedIn(false);
          localStorage.removeItem('accessToken');
        }
        
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error checking token:', error);
        setIsLoggedIn(false);
         localStorage.removeItem('accessToken');
      }
    };

    checkTokenValidity();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/SSABS/user/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {isLoggedIn && (
        <>
          <UserNavigation />
          <UsersLAnding />
        </>
      )}
    </div>
  );
};

export default UserHome;