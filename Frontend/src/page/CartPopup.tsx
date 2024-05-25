import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
}

interface CartPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ isOpen, onClose }) => {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetchCartProducts();
        }
    }, [isOpen]);

    const fetchCartProducts = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('Token is missing');
                return;
            }

            const response = await axios.get<Product[]>(
                'http://localhost:5001/SSABS/cart/add',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            setCartProducts(response.data);
        } catch (error) {
            console.error("Error fetching cart products:", error);
        }
    };

    const handleDelete = async (productId: string) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('Token is missing');
            return;
        }

        // Make a DELETE request to your backend API endpoint to delete the product from the cart
        try {
            const response = await axios.delete(`http://localhost:5001/SSABS/cart/${productId}`);
            console.log('Cart item deleted:', response.data);
        } catch (error) {
            console.error('Error deleting product from cart:', error);
        }
        // If the deletion is successful, you can update the cartProducts state to reflect the changes
        setCartProducts(prevProducts => prevProducts.filter(product => product._id !== productId));

        console.log(`Product ${productId} deleted from cart`);
    } catch (error) {
        console.error("Error deleting product from cart:", error);
    }
};

    const handlePayment = async (productId: string) => {
        try {
            // Implement logic for handling payment
            console.log(`Processing payment for product ${productId}`);
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content" style={{ animation: 'fade-in 0.3s ease' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Cart</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: '10px', right: '10px', color: '#000', opacity: '0.5', fontSize: '1.5rem' }}>
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body">
                        {cartProducts.map(product => (
                            <div key={product._id}>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Price: {product.price}</p>
                                <button style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleDelete(product._id)}>Delete</button>
                                <button style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handlePayment(product._id)}>Payment</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPopup;
