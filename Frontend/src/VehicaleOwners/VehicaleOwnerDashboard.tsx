import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VehicleNav from './vehicleNav';
import { Pie, Bar } from 'react-chartjs-2';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface Vehicles {
  contactNumber: string;
  vehicleType: string;
  licensePlate: string;
  additionalInfo: string;
  photo: string;
}

const VehicaleOwnerDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [contentData, setContentData] = useState<Vehicles[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/SSABS/vehicaleOwn/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setContentData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const groupedByCategory = contentData.reduce((acc, item) => {
    if (!acc[item.vehicleType]) {
      acc[item.vehicleType] = 0;
    }
    acc[item.vehicleType] += 1;
    return acc;
  }, {} as Record<string, number>);

  const vehicleTypes = Object.keys(groupedByCategory);
  const totals = vehicleTypes.map(vehicleType => groupedByCategory[vehicleType]);

  const pieData = {
    labels: vehicleTypes,
    datasets: [
      {
        data: totals,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#7a56ff', '#56ff7a'], 
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#7a56ff', '#56ff7a'],
      },
    ],
  };

  const barData = {
    labels: vehicleTypes,
    datasets: [
      {
        label: 'Number of Posts',
        data: totals,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(122, 86, 255, 0.2)',
          'rgba(86, 255, 122, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(122, 86, 255, 1)',
          'rgba(86, 255, 122, 1)',
          
        ],
        borderWidth: 1,
      },
    ],
  };

  

  return (
    <div>
      <VehicleNav />

      <div className="dashboard-container">

        <style>
          {`
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f6f9;
        }

        .dashboard-container {
          padding: 20px;
        }

        .header {
          background-color: #434c8d;
          color: white;
          padding: 40px;
          text-align: center;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60px;
        }

        .top-section, .middle-section, .bottom-section {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .top-box, .middle-box, .bottom-box {
          background-color: white;
          font-size: 24px;
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          flex: 1;
          margin: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .top-box {
          cursor: pointer;
        }

        .top-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .top-box-1 {
          background-color: #f9e79f;
          border-left: 5px solid #f1c40f;
        }

        .top-box-2 {
          background-color: #aed6f1;
          border-left: 5px solid #3498db;
        }

        .top-box-3 {
          background-color: #f5b7b1;
          border-left: 5px solid #e74c3c;
        }

        .top-box-4 {
          background-color: #d5f5e3;
          border-left: 5px solid #2ecc71;
        }

        .middle-box:nth-child(1) {
          border-top: 5px solid #f1c40f;
        }

        .middle-box:nth-child(2) {
          border-top: 5px solid #3498db;
        }

        .middle-box:nth-child(3) {
          border-top: 5px solid #2ecc71;
        }

        .bottom-box:nth-child(1) {
          background-color: #f9e79f;
          border-left: 5px solid #f1c40f;
        }

        .bottom-box:nth-child(2) {
          background-color: #aed6f1;
          border-left: 5px solid #3498db;
        }

        .bottom-box:nth-child(3) {
          background-color: #f5b7b1;
          border-left: 5px solid #e74c3c;
        }

        .bottom-box:nth-child(4) {
          background-color: #d5f5e3;
          border-left: 5px solid #2ecc71;
        }

        @media (max-width: 1024px) {
          .top-box, .middle-box, .bottom-box {
            flex: 1 1 48%; /* Two items per row */
            margin: 10px 1%;
          }
        }

        @media (max-width: 768px) {
          .top-box, .middle-box, .bottom-box {
            flex: 1 1 100%; /* Full width on smaller screens */
            margin: 10px 0;
          }

          .header {
            padding: 20px;
            height: auto; /* Adjust height for smaller screens */
          }
        }
        `}
        </style>
        {/* <SelerNav/> */}
        <header className="header">
          <h1>Vehicle Owner Dashboard</h1>
        </header>
        <div className="top-section">
          <Link to={'/SSABS/vehicaleOwn/profile'}>
            <button className="top-box top-box-1">Edit Profile</button>
          </Link>
          <Link to={'/SSABS/vehicaleOwn/allpost'}>
            <button className="top-box top-box-2">Uploaded Vehicle</button>
          </Link>
          <Link to={'/SSABS/vehicaleOwn/products'}>
            <button className="top-box top-box-3">Register Vehicle</button>
          </Link>
          
        </div>
        <div className="middle-section">
          <div className="middle-box" data-aos="fade-up">
            <h3>Total Content by Vehicles</h3>
            <Pie data={pieData} />
          </div>
          <div className="middle-box" data-aos="fade-up">
            <h3>Number of Posts by Vehicles</h3>
            <Bar data={barData} />
          </div>
          
        </div>
       

      </div>
      </div>
      );
};

      
      export default VehicaleOwnerDashboard;
