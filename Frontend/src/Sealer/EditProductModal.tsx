import React, { useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  totalHarvest: number;
}

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

type Position = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
type Resize = 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [totalHarvest, setTotalHarvest] = useState(product.totalHarvest);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...product, name, price, description, totalHarvest });
  };

  const modalStyles = {
    overlay: {
      position: 'fixed' as Position,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    content: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '400px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px'
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    textarea: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      resize: 'vertical' as Resize,
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      padding: '8px 16px',
      marginLeft: '10px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: 'white'
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Name:</label>
            <input
              placeholder='name'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={modalStyles.input}
            />
          </div>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Price:</label>
            <input
              placeholder='price'
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={modalStyles.input}
            />
          </div>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Description:</label>
            <textarea
              placeholder='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={modalStyles.textarea}
            />
          </div>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Total Harvest:</label>
            <input
              placeholder='total harvest'
              type="number"
              value={totalHarvest}
              onChange={(e) => setTotalHarvest(Number(e.target.value))}
              style={modalStyles.input}
            />
          </div>
          <div style={modalStyles.buttonGroup}>
            <button type="button" onClick={onClose} style={modalStyles.button}>
              Cancel
            </button>
            <button type="submit" style={modalStyles.button}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
