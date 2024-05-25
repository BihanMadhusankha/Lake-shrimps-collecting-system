import React, { useState } from 'react';
import axios from 'axios';

interface Vehicle {
  _id: string;
  licensePlate: string;
  vehicleType: string;
  contactNumber: string;
  additionalInfo: string;
}

interface Props {
  vehicle: Vehicle;
  closeModal: () => void;
}

const UpdateVehicleModal: React.FC<Props> = ({ vehicle, closeModal }) => {
  const [formData, setFormData] = useState<Vehicle>(vehicle);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put(`http://localhost:5001/SSABS/vehicaleOwn/products/${vehicle._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        console.log('Updated vehicle data:', response.data);
        closeModal(); // Close the modal after submission
      } else {
        console.error('Error updating vehicle:', response.data);
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleCancelClick = () => {
    closeModal(); // Close the modal when cancel button is clicked
  };

  return (
    <div className="modal" style={{ display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
      <div className="modal-content" style={{ backgroundColor: '#fff', margin: '15% auto', padding: '20px', borderRadius: '5px', maxWidth: '400px' }}>
        <span className="close" style={{ float: 'right', cursor: 'pointer' }} onClick={closeModal}>&times;</span>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Vehicle</h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="licensePlate" style={{ display: 'block', marginBottom: '5px' }}>License Plate</label>
            <input type="text" id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="vehicleType" style={{ display: 'block', marginBottom: '5px' }}>Vehicle Type</label>
            <input type="text" id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="contactNumber" style={{ display: 'block', marginBottom: '5px' }}>Contact Number</label>
            <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="additionalInfo" style={{ display: 'block', marginBottom: '5px' }}>Additional Info</label>
            <input type="text" id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ padding: '8px 16px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginRight: '10px' }}>Update</button>
            <button type="button" onClick={handleCancelClick} style={{ padding: '8px 16px', border: 'none', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVehicleModal;
