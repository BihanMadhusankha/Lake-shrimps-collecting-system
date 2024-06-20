import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelerNav from './sealerNav';
import { Pie, Bar, Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

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

interface Products {
  name: string;
  price: number;
  description: string;
  totalHarvest: string;
 
}

const SealerDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [contentData, setContentData] = useState<Products[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get('http://localhost:5001/SSABS/seler/dashboard', {
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
        const response = await axios.get('http://localhost:5001/SSABS/seler/products', {
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
    if (!acc[item.name]) {
      acc[item.name] = 0;
    }
    acc[item.name] += 1;
    return acc;
  }, {} as Record<string, number>);

  const names = Object.keys(groupedByCategory);
  const totals = names.map(name => groupedByCategory[name]);

  const pieChartData = {
    labels: names,
    datasets: [
      {
        label: 'Pie Chart',
        data:totals,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ECC71', '#9B59B6'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ECC71', '#9B59B6'],

      },
    ],
  };

  const barData = {
    labels: names,
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


  const lineData = {
    labels: names,
    datasets: [
      {
        label: 'Number of Posts',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: totals,
      },
    ],
  };

  return (
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
      <SelerNav/>
      <header className="header">
        <h1>Seller Dashboard</h1>
      </header>
      <div className="top-section">
        <Link to={'/SSABS/seler/profile'}>
          <button className="top-box top-box-1">Edit Profile</button>
        </Link>
        <Link to={'/SSABS/seler/allpost'}>
          <button className="top-box top-box-2">Uploaded Post</button>
        </Link>
        <Link to={'/SSABS/seler/products'}>
          <button className="top-box top-box-3">Upload Post</button>
        </Link>
        <Link to={'/SSABS/sellers/requests'}>
          <button className="top-box top-box-4">History</button>
        </Link>
      </div>
      <div className="middle-section">
        <div className="middle-box">
          <h2>Daily Sales</h2>
          <Pie data={pieChartData} />
        </div>
        <div className="middle-box">
          <h2>Statistics</h2>
          <Bar data={barData} />
        </div>
        <div className="middle-box">
          <h2>Total Revenue</h2>
          <Line data={lineData} />
        </div>
      </div>
      
    </div>
  );
};

export default SealerDashboard;
