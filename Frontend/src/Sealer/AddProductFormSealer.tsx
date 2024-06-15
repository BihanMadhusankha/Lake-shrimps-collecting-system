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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const validateForm = () => {
    let formIsValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!name) {
      newErrors.name = 'Please select a product';
      formIsValid = false;
    }

    if (price <= 0) {
      newErrors.price = 'Please enter a valid price';
      formIsValid = false;
    }

    if (!description || !/^[A-Z].{0,99}$/.test(description)) {
      newErrors.description = 'Please enter a description with the first letter capital and up to 100 characters';
      formIsValid = false;
    }

    if (totalHarvest <= 0) {
      newErrors.totalHarvest = 'Please enter a valid total harvest';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.error('No user logged in');
      return;
    }

    const sellerId = user.id;

    if (!validateForm()) {
      return;
    }

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
      setSuccessMessage('Product added successfully');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/SSABS/seler/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Error posting product', error);
      setSuccessMessage('Failed to add product');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
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

  const successMessageStyle: React.CSSProperties = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    textAlign: 'center',
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
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div>
          <label style={labelStyle}>Product Unit Price (Rs)</label>
          <input
            placeholder="product price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            style={inputStyle}
          />
          {errors.price && <div className="error">{errors.price}</div>}
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
          {errors.description && <div className="error">{errors.description}</div>}
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
          {errors.totalHarvest && <div className="error">{errors.totalHarvest}</div>}
        </div>
        <button type="submit" style={buttonStyle}>Add Product</button>
      </form>
      {successMessage && <div style={successMessageStyle}>{successMessage}</div>} 
    </div>
  );
};

export default AddProductFormSealer;
