import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterVehicle = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    contactNumber: '',
    vehicleType: '',
    licensePlate: '',
    additionalInfo: ''
  });
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a vehicle photo.');
      return;
    }

    const data = new FormData();
    data.append('photo', file);
    data.append('contactNumber', formData.contactNumber);
    data.append('vehicleType', formData.vehicleType);
    data.append('licensePlate', formData.licensePlate);
    data.append('additionalInfo', formData.additionalInfo);

    try {
      const response = await axios.post('http://localhost:5001/SSABS/vehicaleOwn/products', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log('Vehicle registered successfully', response.data);
      navigate('/SSABS/vehicale_owner/dashboard');
    } catch (error) {
      console.error('Error registering vehicle:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginTop: '20px', width: '400px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Register Your Vehicle</h3>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="contactNumber" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Contact Number</label>
            <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="vehicleType" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Vehicle Type</label>
            <select id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required>
              <option value="">Select a vehicle type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="bicycle">Bicycle</option>
              <option value="truck">Truck</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="licensePlate" style={{ display: 'block', fontSize: '16px', color: '#333' }}>License Plate</label>
            <input type="text" id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="additionalInfo" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Additional Info</label>
            <input type="text" id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="photo" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Upload Vehicle Photo</label>
            <input type="file" id="photo" name="photo" onChange={handleFileChange} style={{ width: '100%', padding: '10px', borderRadius: '5px, border: 1px solid #ccc' }} required />
          </div>
          <button type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterVehicle;
