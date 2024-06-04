import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavigation from '../Navigations/userNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerImage from '../assets/pngegg (7).png';

interface VehicleOwner {
  firstname: string;
  lastname: string;
  email: string;
  nic: string;
  phone: string;
  _id: string;
}

interface Vehicle {
  licensePlate: string;
  vehicleType: string;
  _id: string; // Assuming vehicle has an ID
  // Add more properties as needed
}

const VehicleOwnerPage: React.FC = () => {
  const [vehicleOwners, setVehicleOwners] = useState<VehicleOwner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<VehicleOwner | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleOwners = async () => {
      try {
        const response = await fetch('http://localhost:5001/SSABS/vehicaleowner');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVehicleOwners(data.data);
      } catch (error) {
        console.error('Error fetching vehicle owners:', error);
      }
    };

    fetchVehicleOwners();
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (selectedOwner) {
        try {
          const response = await fetch(`http://localhost:5001/SSABS/vehicaleown/${selectedOwner._id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setVehicles(data.data);
        } catch (error) {
          console.error('Error fetching vehicles:', error);
        }
      }
    };

    fetchVehicles();
  }, [selectedOwner]);

  const handleOwnerSelect = (owner: VehicleOwner) => {
    setSelectedOwner(owner);
  };

  const handleBookVehicle = (vehicle: Vehicle) => {
    navigate(`/user/book-vehicle/${vehicle._id}`);
  };

  return (
    <div>
      <UserNavigation />
      <h1 className='d-flex justify-content-center mt-4'>Vehicle Owners</h1>
      <div className="container  rounded-5 p-5 mt-lg-5">
        <div className="row justify-content-center">
          {vehicleOwners.map((owner: VehicleOwner) => (
            <div className="card bg-gray m-lg-3 rounded-3 col-lg-3" key={owner._id}>
              <div className="card-body" onClick={() => handleOwnerSelect(owner)}>
                <img src={registerImage} className="img-fluid" alt="..." />
                <h5>First Name: {owner.firstname}</h5>
                <h5>Last Name: {owner.lastname}</h5>
                <h5>Email: {owner.email}</h5>
                <h5>National Id Card: {owner.nic}</h5>
                <h5>Contact Number: {owner.phone}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedOwner && (
        <div className="container bg-black rounded-5 p-5 mt-lg-5">
          <h2>Vehicles belonging to {selectedOwner.firstname} {selectedOwner.lastname}</h2>
          <div className="row justify-content-center">
            {vehicles.map((vehicle: Vehicle, index: number) => (
              <div className="card bg-gray m-lg-3 rounded-3 col-lg-3 d-flex flex-row" key={index}>
                <div className="card-body">
                  <h5>License Plate: {vehicle.licensePlate}</h5>
                  <h5>Vehicle Type: {vehicle.vehicleType}</h5>
                  {/* Render other vehicle details as needed */}
                  <button
                    onClick={() => handleBookVehicle(vehicle)}
                    className="btn btn-primary mt-3"
                  >
                    Book a Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleOwnerPage;
