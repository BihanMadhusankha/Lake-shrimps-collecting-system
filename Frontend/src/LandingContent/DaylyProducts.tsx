import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavigation from '../Navigations/userNav';

interface Product {
  _id: string;
  name: string;
  price: number;
  totalHarvest: number;
  description: string;
  sellerId: string;
}

interface RequestDetails {
  address: string;
  city: string;
  deliveryOption: string;
  quantity: number;
  totalAmount: number;
}

const DaylyProducts: React.FC = () => {
  const [todayProducts, setTodayProducts] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [requestDetails, setRequestDetails] = useState<RequestDetails>({
    address: '',
    city: '',
    deliveryOption: '',
    quantity: 1,
    totalAmount: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alert, setAlert] = useState<{ type: string, message: string } | null>(null);
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
  }, []);

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

  const handleRequestClick = (product: Product) => {
    setSelectedProduct(product);
    setRequestDetails({
      ...requestDetails,
      totalAmount: product.price * requestDetails.quantity,
    });
    setShowRequestForm(true);
  };

  const validateField = (name: string, value: string | number) => {
    let error = '';
    switch (name) {
      case 'address':
        if (!value) {
          error = 'Address is required';
        } else if (typeof value === 'string' && !/^[a-zA-Z0-9\s,.-]+$/.test(value)) {
          error = 'Address can only contain letters, numbers, spaces, commas, and periods';
        } else if (typeof value === 'string' && value.length < 5) {
          error = 'Address must be at least 5 characters long';
        }
        break;
      case 'city':
        if (!value) {
          error = 'City is required';
        } else if (typeof value === 'string' && !/^[a-zA-Z\s]+$/.test(value)) {
          error = 'City must contain only letters and spaces';
        }
        break;
      case 'quantity':
        if (Number(value) <= 0) {
          error = 'Quantity must be greater than zero';
        } else if (!Number.isInteger(Number(value))) {
          error = 'Quantity must be a whole number';
        }
        break;
      case 'deliveryOption':
        if (!value) {
          error = 'Delivery option is required';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequestDetails((prevDetails) => {
      const newDetails = { ...prevDetails, [name]: value };

      if (name === 'quantity' && selectedProduct) {
        newDetails.totalAmount = selectedProduct.price * Number(value);
      }

      validateField(name, value);

      return newDetails;
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldsToValidate = ['address', 'city', 'quantity', 'deliveryOption'];
    let allValid = true;

    fieldsToValidate.forEach((field) => {
      validateField(field, requestDetails[field as keyof RequestDetails]);
      if (errors[field as keyof typeof errors]) {
        allValid = false;
      }
    });

    if (!allValid) {
      return;
    }

    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    const requestData = {
      productId: selectedProduct?._id,
      address: requestDetails.address,
      city: requestDetails.city,
      deliveryOption: requestDetails.deliveryOption,
      quantity: requestDetails.quantity,
      totalAmount: requestDetails.totalAmount,
      sellerId: selectedProduct?.sellerId,
      userId,
    };

    try {
      const response = await axios.post('http://localhost:5001/SSABS/request', requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log('Request sent successfully', response.data);
      setShowRequestForm(false);
      setAlert({ type: 'success', message: 'Request sent successfully!' });
    } catch (error) {
      console.error('Error sending request:', error);
      setAlert({ type: 'error', message: 'Error sending request. Please try again.' });
    }
  };

  const styles = {
    headerContainer: {
      width: '100%',
      marginTop: '20px',
    } as React.CSSProperties,
    header: {
      fontSize: '40px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    } as React.CSSProperties,
    productsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '40px',
      marginBottom: '40px',
    } as React.CSSProperties,
    productCard: {
      width: '280px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      backgroundColor: '#fff',
      textAlign: 'center',
      margin: '10px',
      transition: 'transform 0.3s ease',
    } as React.CSSProperties,
    productName: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    } as React.CSSProperties,
    productPrice: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    } as React.CSSProperties,
    productHarvest: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    } as React.CSSProperties,
    productDescription: {
      fontSize: '16px',
      marginBottom: '20px',
      color: '#666',
    } as React.CSSProperties,
    requestButton: {
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      margin: '5px',
    } as React.CSSProperties,
    noProductsMessage: {
      fontSize: '18px',
      color: '#666',
    } as React.CSSProperties,
    formContainerOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    } as React.CSSProperties,
    formContainer: {
      width: '400px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      backgroundColor: '#fff',
      textAlign: 'center',
      position: 'relative',
    } as React.CSSProperties,
    formHeader: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    } as React.CSSProperties,
    formGroup: {
      marginBottom: '20px',
    } as React.CSSProperties,
    formLabel: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '16px',
      color: '#333',
    } as React.CSSProperties,
    formInput: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    } as React.CSSProperties,
    formSelect: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    } as React.CSSProperties,
    submitButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      margin: '5px',
    } as React.CSSProperties,
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#dc3545',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
    } as React.CSSProperties,
    errorText: {
      color: 'red',
      fontSize: '14px',
      marginTop: '5px',
    } as React.CSSProperties,
    successAlert: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
      textAlign: 'center',
    } as React.CSSProperties,
    errorAlert: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
      textAlign: 'center',
    } as React.CSSProperties,
  };

  return (
    <div>
      <UserNavigation />
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Today's Products</h1>
        {alert && (
          <div style={alert.type === 'success' ? styles.successAlert : styles.errorAlert}>
            {alert.message}
          </div>
        )}
        <div style={styles.productsContainer}>
          {todayProducts.length > 0 ? (
            todayProducts.map(product => (
              <div
                key={product._id}
                style={styles.productCard}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <h3 style={styles.productName}>Product Name: {product.name}</h3>
                <h3 style={styles.productPrice}>One Unit Price: {product.price}</h3>
                <h3 style={styles.productHarvest}>Total Harvest: {product.totalHarvest}</h3>
                <p style={styles.productDescription}>{product.description}</p>
                <button style={styles.requestButton} onClick={() => handleRequestClick(product)}>Request</button>
              </div>
            ))
          ) : (
            <p style={styles.noProductsMessage}>No products added today.</p>
          )}
        </div>
      </div>
      {showRequestForm && selectedProduct && (
        <div style={styles.formContainerOverlay}>
          <div style={styles.formContainer}>
            <h3 style={styles.formHeader}>Request Details</h3>
            <form onSubmit={handleFormSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="address" style={styles.formLabel}>My home address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={requestDetails.address}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  pattern="^[a-zA-Z0-9\s,.-]+$"
                  required
                />
                {errors.address && <span style={styles.errorText}>{errors.address}</span>}
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="city" style={styles.formLabel}>My home city</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={requestDetails.city}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  required
                />
                {errors.city && <p style={styles.errorText}>{errors.city}</p>}
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="quantity" style={styles.formLabel}>I want quantity(KG)</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={requestDetails.quantity}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  required
                />
                {errors.quantity && <p style={styles.errorText}>{errors.quantity}</p>}
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="totalAmount" style={styles.formLabel}>Total Amount</label>
                <input
                  type="text"
                  id="totalAmount"
                  name="totalAmount"
                  value={requestDetails.totalAmount.toFixed(2)}
                  readOnly
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="deliveryOption" style={styles.formLabel}>Delivery Option</label>
                <select
                  id="deliveryOption"
                  name="deliveryOption"
                  value={requestDetails.deliveryOption}
                  onChange={handleInputChange}
                  style={styles.formSelect}
                  required
                >
                  <option value="">Select Delivery Option</option>
                  <option value="yes">I need a delivery</option>
                  <option value="no">I no need a delivery</option>
                </select>
                {errors.deliveryOption && <p style={styles.errorText}>{errors.deliveryOption}</p>}
              </div>
              <div style={styles.formGroup}>
                <button type="submit" style={styles.submitButton}>Submit Request</button>
              </div>
            </form>
            <button style={styles.closeButton} onClick={() => setShowRequestForm(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaylyProducts;
