import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  const styles = {
    container: {
      padding: '20px',
      margin: '20px auto', // Adjusted margin for better spacing
      maxWidth: '90%', // Reduced max width to fit better on the screen
      backgroundColor: '#f7f9fc',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    },
    title: {
      textAlign: 'center' as const,
      marginBottom: '20px',
      color: '#333',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginTop: '10px',
    },
    th: {
      padding: '10px',
      textAlign: 'left' as const,
      borderBottom: '1px solid #ccc',
      backgroundColor: '#f0f0f0',
    },
    td: {
      padding: '10px',
      textAlign: 'left' as const,
      borderBottom: '1px solid #ccc',
    },
    evenRow: {
      backgroundColor: '#fff',
    },
    oddRow: {
      backgroundColor: '#f9f9f9',
    },
    photo: {
      width: '100px',
      height: 'auto',
      borderRadius: '5px',
    },
    button: {
      padding: '5px 10px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      marginRight: '10px',
    },
    updateButton: {
      backgroundColor: '#007bff',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
    },
    updateButtonHover: {
      backgroundColor: '#0056b3',
    },
    deleteButtonHover: {
      backgroundColor: '#c82333',
    }
  };

  return (
    <div>
      <VehicleNav/>
      <div style={styles.container}>
        <h2 style={styles.title}>Registered Vehicles</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>License Plate</th>
              <th style={styles.th}>Vehicle Type</th>
              <th style={styles.th}>Contact Number</th>
              <th style={styles.th}>Additional Info</th>
              <th style={styles.th}>Photo</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle._id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td style={styles.td}>{vehicle.licensePlate}</td>
                <td style={styles.td}>{vehicle.vehicleType}</td>
                <td style={styles.td}>{vehicle.contactNumber}</td>
                <td style={styles.td}>{vehicle.additionalInfo}</td>
                <td style={styles.td}>
                  <img src={vehicle.photo} alt="Vehicle" style={styles.photo} />
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleUpdateClick(vehicle)}
                    style={{ ...styles.button, ...styles.updateButton }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    style={{ ...styles.button, ...styles.deleteButton }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedVehicle && <UpdateVehicleModal vehicle={selectedVehicle} />} {/* Display modal if a vehicle is selected */}
      </div>
    </div>
  );
};

export default RegisteredVehicles;
