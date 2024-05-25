import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateVehicleModal from './UpdateVehicleModal'; // Import the modal component

interface Vehicle {
  _id: string; // Add _id field for identifying the vehicle
  licensePlate: string;
  vehicleType: string;
  contactNumber: string;
  additionalInfo: string;
  photo: string;
}

const RegisteredVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    // Fetch registered vehicles from the backend
    const fetchVehicles = async () => {
      try {
        const response = await axios.get<Vehicle[]>('http://localhost:5001/SSABS/vehicaleOwn/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleUpdateClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:5001/SSABS/vehicaleOwn/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted vehicle from the state
      setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle._id !== id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div style={{ padding: '20px', margin: 'auto', maxWidth: '800px' }}>
      <h2 style={{ textAlign: 'center' }}>Registered Vehicles</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0', textAlign: 'left' }}>License Plate</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0', textAlign: 'left' }}>Vehicle Type</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0', textAlign: 'left' }}>Contact Number</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0', textAlign: 'left' }}>Additional Info</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0', textAlign: 'left' }}>Photo</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f2f2f2' }}>
              <td>{vehicle.licensePlate}</td>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.contactNumber}</td>
              <td>{vehicle.additionalInfo}</td>
              <td>
                <img src={vehicle.photo} alt="Vehicle" style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>
                <button onClick={() => handleUpdateClick(vehicle)} style={{ marginRight: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Update</button>
                <button onClick={() => handleDelete(vehicle._id)} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedVehicle && <UpdateVehicleModal vehicle={selectedVehicle} />} {/* Display modal if a vehicle is selected */}
    </div>
  );
};

export default RegisteredVehicles;
