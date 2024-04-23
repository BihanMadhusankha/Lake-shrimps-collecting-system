import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd'; // Use Ant Design's message component
import * as refresh from 'axios-refresh';

function CurrentUsers() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        // Retrieve token from local storage
        const accessToken = localStorage.getItem('user_token');

        // Configure axios-refresh for automatic token refresh (if using)
        if (accessToken) {
            (refresh as any).setup({
            instance: axios.create({ baseURL: 'http://localhost:5001/SSABS/user/current' }), // Replace with your backend API base URL
            accessToken,
            blacklist: [401], // Refresh token on 401 Unauthorized errors
            refreshUrl: '/user/current', // Replace with your refresh token endpoint
            onRefresh: (newToken: string) => {
              localStorage.setItem('user_token', newToken); // Update token in storage
            },
          });
        }

        const response = await axios.get('http://localhost:5001/SSABS/user/current', {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {expiresIn: '1m'}, // Add authorization header if token exists
        });

        if (response.data) {
          setUserData(response.data.user); // Store user data
        } else {
          // Handle invalid token or expired token
          localStorage.removeItem('user_token'); // Remove invalid token
          message.error('Login session expired. Please login again.');
          navigate('/SSABS/user/login'); // Redirect to login on invalid token
        }
      } catch (error:Error) {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          // Handle expired token gracefully (optional)
          message.error('Login session expired. Please login again.');
          navigate('/SSABS/user/login'); // Redirect to login on expired token
          localStorage.removeItem('user_token'); // Remove expired token
        } else {
          message.error('An unexpected error occurred. Please try again later.');
        }
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (userData) {
    return (
      <div>
        <h2>Welcome, {userData.email}</h2>
        {/* Display other user data as needed */}
      </div>
    );
  }

  return <div>You are not logged in.</div>;
}

export default CurrentUsers;
