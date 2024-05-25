import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProductModal from './EditProductModal'; // Import the EditProductModal component
import SealerNav from './sealerNav';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  dateAdded: string; // Assuming dateAdded is part of the product model
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(''); // State for the selected date

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
        const response = await axios.get<Product[]>('http://localhost:5001/SSABS/seler/products', {
          headers: {
            Authorization: `Bearer ${token}` // Attach token to request headers
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
      await axios.delete(`http://localhost:5001/SSABS/seler/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Attach token to request headers
        }
      });
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedProduct: Product) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5001/SSABS/seler/products/${updatedProduct._id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Filter products based on selected date
  const filteredProducts = selectedDate
    ? products.filter(product => product.dateAdded.startsWith(selectedDate))
    : products;

  return (
    <div>
      <SealerNav/>
      <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginLeft: '10px',
          }}
        />
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%', animation: 'fadeIn 1s ease-in-out' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product._id} style={{ animation: 'fadeIn 1s ease-in-out' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.description}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                <button
                  onClick={() => handleEdit(product)}
                  style={{
                    marginRight: '8px',
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  style={{
                    marginRight: '8px',
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
    </div>
  );
};

// Adding global CSS for animations
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);

export default Dashboard;