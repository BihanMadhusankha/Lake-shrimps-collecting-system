// VehicleListPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserNavigation from '../Navigations/userNav';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Vehicle {
  licensePlate: string;
  vehicleType: string;
  // Add more properties as needed
}

const VehicleListPage: React.FC = () => {
  const { ownerId } = useParams<{ ownerId: string }>();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`http://localhost:5001/SSABS/vehicaleown/products/${ownerId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVehicles(data.data);
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
                {/* Render other vehicle details as needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleListPage;
