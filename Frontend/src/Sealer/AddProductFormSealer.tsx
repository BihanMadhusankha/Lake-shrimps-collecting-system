import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SealerNav from './sealerNav';
import { useAuth } from '../page/AuthContext';

const AddProductFormSealer: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [totalHarvest, setTotalHarvest] = useState<number>(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.error('No user logged in');
      return;
    }

    const sellerId = user.id;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Token is missing');
        return;
      }

      const response = await axios.post('http://localhost:5001/SSABS/seler/products', {
        name,
        price,
        description,
        totalHarvest,
        sellerId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(response.data.totalHarvest);
      navigate('/SSABS/seler/dashboard');
    } catch (error) {
      console.error('Error posting product', error);
    }
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle: React.CSSProperties = {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <div>
      <SealerNav />
      <form className='d-flex justify-content-center mt-4' onSubmit={handleSubmit} style={formStyle}>
        <div>
          <h3 className='d-flex justify-content-center '>Add product</h3>
          <label style={labelStyle}>Select shrimps type name</label>
          <select
            
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select a product</option>
            <option value="Brine shrimp">Brine shrimp</option>
            <option value="Cherry shrimp">Cherry shrimp</option>
            <option value="Cocktail shrimp">Cocktail shrimp</option>
            <option value="Large shrimp">Large shrimp</option>
            <option value="Jumbo shrimp">Jumbo shrimp</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Product Unit Price (Rs)</label>
          <input
            placeholder="product price"
            type="decimal"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            placeholder="product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ ...inputStyle, height: '100px' }}
          ></textarea>
        </div>
        <div>
          <label style={labelStyle}>Total Harvest (Kg)</label>
          <input
            placeholder="total harvest"
            type="number"
            value={totalHarvest}
            onChange={(e) => setTotalHarvest(Number(e.target.value))}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductFormSealer;
