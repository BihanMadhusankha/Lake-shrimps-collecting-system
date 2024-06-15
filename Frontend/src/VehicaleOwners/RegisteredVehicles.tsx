import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'jspdf-autotable';
import UpdateVehicleModal from './UpdateVehicleModal'; // Import the modal component
import VehicleNav from './vehicleNav';

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
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
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


  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.additionalInfo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <VehicleNav />
      <div style={{ padding: '20px', margin: '20px auto', maxWidth: '90%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Registered Vehicles</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px', padding: '5px' }}
        />
        {/* <button onClick={handleDownloadPDF} style={{ marginBottom: '20px', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', color: '#fff', backgroundColor: '#007bff' }}>Download PDF</button> */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>License Plate</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>Vehicle Type</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>Contact Number</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>Additional Info</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>Photo</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={vehicle._id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' }}>{vehicle.licensePlate}</td>
                <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' }}>{vehicle.vehicleType}</td>
                <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' }}>{vehicle.contactNumber}</td>
                <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' }}>{vehicle.additionalInfo}</td>
                <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' }}>
                  <img src={vehicle.photo} alt="Vehicle" style={{ width: '100px', height: 'auto', borderRadius: '5px' }} />
                </td>
                <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' }}>
                  <button onClick={() => handleUpdateClick(vehicle)} style={{ padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', color: '#fff', backgroundColor: '#007bff', marginRight: '10px' }}>Update</button>
                  <button onClick={() => handleDelete(vehicle._id)} style={{ padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', color: '#fff', backgroundColor: '#dc3545' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedVehicle && <UpdateVehicleModal vehicle={selectedVehicle} closeModal={() => setSelectedVehicle(null)} />} {/* Display modal if a vehicle is selected */}
      </div>
    </div>
  );
};

export default RegisteredVehicles;
