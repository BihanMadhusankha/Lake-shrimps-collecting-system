import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VehicleNav from './vehicleNav';

const VehicaleOwnerDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get('http://localhost:5001/SSABS/vehicale_owner/dashboard', {
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
      <VehicleNav />

      <div className="container" style={containerStyle}>

        <>
          <div style={cardStyle}>
            <h2 style={titleStyle}>PROFILE</h2>
            <Link to={'/SSABS/vehicaleOwn/profile'}>
              <button style={buttonStyle}>More</button>
            </Link>
          </div>
          <div style={cardStyle}>
            <h2 style={titleStyle}>DASHBOARD</h2>
            <Link to={'/SSABS/vehicaleOwn/allpost'}>
              <button style={buttonStyle}>More</button>
            </Link>
          </div>
          <div style={cardStyle}>
            <h2 style={titleStyle}>Setting</h2>
            <Link to={'/SSABS/vehicaleOwn/products'}>
              <button style={buttonStyle}>More</button>
            </Link>
          </div>
        </>

      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
};

const cardStyle: React.CSSProperties = {
  flex: '1',
  minWidth: '280px',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(to bottom right, #ffffff, #f0f0f0)',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  margin: '0 20px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#333333',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  background: '#007bff',
  color: '#ffffff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
};

export default VehicaleOwnerDashboard;
