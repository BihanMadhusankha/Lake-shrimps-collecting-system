import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getToken();

    if (token) {
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = (token: string) => {
    axios.get('http://localhost:5001/SSABS/user/userhome/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  const getToken = () => {
    // Implement your logic to get the token from localStorage or wherever it's stored
    return localStorage.getItem('token');
  };

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
