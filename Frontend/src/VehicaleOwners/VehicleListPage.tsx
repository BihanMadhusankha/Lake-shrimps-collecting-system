import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserNavigation from '../Navigations/userNav';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Vehicle {
  licensePlate: string;
  vehicleType: string;
}

const VehicleListPage: React.FC = () => {
  const { ownerId } = useParams<{ ownerId: string }>();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/SSABS/vehicaleown/products/${ownerId}`);
        setVehicles(response.data.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, [ownerId]);

  return (
    <div>
      <UserNavigation />
      <h1>Vehicles belonging to Owner</h1>
      <div className="container bg-black rounded-5 p-5 mt-lg-5">
        <div className="row justify-content-center">
          {vehicles.map((vehicle: Vehicle, index: number) => (
            <div className="card bg-gray m-lg-3 rounded-3 col-lg-3 d-flex flex-row" key={index}>
              <div className="card-body">
                <h5>License Plate: {vehicle.licensePlate}</h5>
                <h5>Vehicle Type: {vehicle.vehicleType}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleListPage;
