import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavigation from '../Navigations/userNav';

const DaylyProducts: React.FC = () => {
  const [todayProducts, setTodayProducts] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartUpdated, setCartUpdated] = useState<boolean>(false);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    deliveryOption: ''
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get('http://localhost:5001/SSABS/user/daylyproducts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.data) {
          setIsLoggedIn(false);
          localStorage.removeItem('accessToken');
        } else {
          setIsLoggedIn(true);
          fetchTodayProducts();
        }
      } catch (error) {
        console.error('Error checking token:', error);
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
      }
    };

    checkTokenValidity();
  }, [cartUpdated]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/SSABS/user/login');
    }
  }, [isLoggedIn, navigate]);

  const fetchTodayProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/SSABS/user/daylyproducts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      setTodayProducts(response.data);
    } catch (error) {
      console.error("Error fetching today's products:", error);
    }
  };

  const addToCart = async (productId: string, price: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Token is missing');
        return;
      }

      const response = await axios.post(
        'http://localhost:5001/SSABS/cart/add',
        { productId, price },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setCartUpdated(prevState => !prevState);
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };

  const handlePaymentClick = (productId: string) => {
    setSelectedProductId(productId);
    setShowPaymentForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setDeliveryDetails({
      ...deliveryDetails,
      [e.target.name]: e.target.value
    });

    if (e.target.name === 'deliveryOption' && e.target.value === 'yes') {
      navigate('/SSABS/vehicaleowner');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptFile) {
      alert("Please upload a payment receipt.");
      return;
    }

    const formData = new FormData();
    formData.append('productId', selectedProductId);
    formData.append('address', deliveryDetails.address);
    formData.append('city', deliveryDetails.city);
    formData.append('postalCode', deliveryDetails.postalCode);
    formData.append('country', deliveryDetails.country);
    formData.append('deliveryOption', deliveryDetails.deliveryOption);
    formData.append('receipt', receiptFile);

    try {
      const response = await axios.post('http://localhost:5001/SSABS/payment', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Payment processed successfully', response.data);
      setShowPaymentForm(false);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <UserNavigation />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <>
          <div style={{ width: '100%', marginTop: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Today's Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
              {todayProducts.length > 0 ? (
                todayProducts.map(product => (
                  <div key={product._id} style={{ width: '280px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', textAlign: 'center', margin: '10px', transition: 'transform 0.3s ease' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>{product.name}</h3>
                    <p style={{ fontSize: '16px', marginBottom: '20px', color: '#666' }}>{product.description}</p>
                    <button style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer', margin: '5px' }} onClick={() => addToCart(product._id, product.price)}>Add to Cart</button>
                    <button style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold', cursor: 'pointer', margin: '5px' }} onClick={() => handlePaymentClick(product._id)}>Payment</button>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '18px', color: '#666' }}>No products added today.</p>
              )}
            </div>
          </div>
          {showPaymentForm && (
            <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginTop: '20px', width: '400px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Delivery Details</h3>
              <form onSubmit={handleFormSubmit}>
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="address" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Address</label>
                  <input type="text" id="address" name="address" value={deliveryDetails.address} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="city" style={{ display: 'block', fontSize: '16px', color: '#333' }}>City</label>
                  <input type="text" id="city" name="city" value={deliveryDetails.city} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="postalCode" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Postal Code</label>
                  <input type="text" id="postalCode" name="postalCode" value={deliveryDetails.postalCode} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="country" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Country</label>
                  <input type="text" id="country" name="country" value={deliveryDetails.country} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="deliveryOption" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Delivery Option</label>
                  <select id="deliveryOption" name="deliveryOption" value={deliveryDetails.deliveryOption} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required>
                    <option value="">Select a delivery option</option>
                    <option value="yes">Need a Delivery</option>
                    <option value="no">No Need a Delivery</option>
                  </select>
                </div>
                {deliveryDetails.deliveryOption === 'yes' && (
                  <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="receipt" style={{ display: 'block', fontSize: '16px', color: '#333' }}>Upload Payment Receipt</label>
                    <input type="file" id="receipt" name="receipt" onChange={handleFileChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                  </div>
                )}
                <button type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
              </form>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default DaylyProducts;

