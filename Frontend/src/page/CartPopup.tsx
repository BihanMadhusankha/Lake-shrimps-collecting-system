import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex } from 'antd';

interface Message {
    _id: string;
    userId: string;
    sellerId: string;
    message: string;
    createdAt: Date;
}

interface CartPopupProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

const CartPopup: React.FC<CartPopupProps> = ({ isOpen, onClose, userId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);
    const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchMessages();
        }
    }, [isOpen]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get<Message[]>(
                `http://localhost:5001/SSABS/message/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                }
            );
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleDelete = async (messageId: string) => {
        try {
            await axios.delete(
                `http://localhost:5001/SSABS/message/delete/${messageId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                }
            );
            setMessages(messages.filter((message) => message._id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handlePayment = (sellerId: string) => {
        setSelectedSellerId(sellerId);
        const paymentForm = document.getElementById('paymentForm') as HTMLFormElement | null;
        if (paymentForm) {
            paymentForm.style.display = 'block';
            paymentForm.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                paymentForm.style.opacity = '1';
            }, 10);
        }
    };

    const handleSubmitPayment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            if (!paymentReceipt) {
                throw new Error('No payment receipt selected');
            }
            
            if (!selectedSellerId) {
                throw new Error('Seller ID is not selected');
            }

            const formData = new FormData();
            formData.append('file', paymentReceipt);
            formData.append('sellerId', selectedSellerId);

            console.log(formData.get('sellerId')); // Debug log to check if sellerId is appended

            const response = await axios.post(
                'http://localhost:5001/SSABS/upload/paymentReceipt',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            console.log('File uploaded successfully:', response.data);

        } catch (error) {
            console.error('Error uploading payment receipt:', error);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setPaymentReceipt(file);
        }
    };

    return (
        <div>
            {isOpen && (
                <div>
                    <h1 className='d-flex justify-content-center'>Messages</h1>
                    <ul >
                        {messages.map((message) => (
                            <li className='d-flex fle justify-content-center' key={message._id}>
                                {message.message}
                                <button
                                    style={buttonStyle('#007bff')}
                                    onClick={() => handlePayment(message.sellerId)}
                                >
                                    Payment
                                </button>
                                <button
                                    style={buttonStyle('#dc3545')}
                                    onClick={() => handleDelete(message._id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        style={buttonStyle('#28a745')}
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <form
                        id="paymentForm"
                        style={formStyle}
                        onSubmit={handleSubmitPayment}
                        className='d-flex justify-content-center'
                    >
                        <div  style={{ margin: '10px'}}>
                            <label htmlFor="payment-photo">Add payment receipt</label>
                            <input
                                id="payment-photo"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={inputStyle}
                            />
                        </div>
                        <button
                            type="submit"
                            style={buttonStyle('#007bff')}
                        >
                            Submit Payment
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

const buttonStyle = (bgColor: string) => ({
    padding: '5px',
    margin: '5px',
    borderRadius: '10px',
    backgroundColor: bgColor,
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
});

const formStyle = {
    display: 'none',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginTop: '10px',
    
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    
   
};

export default CartPopup;
