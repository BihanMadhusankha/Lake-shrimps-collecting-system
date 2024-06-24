import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

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
            setAlertMessage('Error fetching messages');
            setAlertType('error');
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
            setAlertMessage('Message deleted successfully');
            setAlertType('success');
        } catch (error) {
            console.error('Error deleting message:', error);
            setAlertMessage('Error deleting message');
            setAlertType('error');
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
            setAlertMessage('Payment receipt uploaded successfully');
            setAlertType('success');
        } catch (error) {
            console.error('Error uploading payment receipt:', error);
            setAlertMessage('Error uploading payment receipt');
            setAlertType('error');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setPaymentReceipt(file);
        }
    };

    return (
        <div style={modalStyles(isOpen)}>
            <div style={modalContentStyles}>
                <div style={headerStyles}>
                    <h2>My Cart</h2>
                    <button style={closeButtonStyles} onClick={onClose}>Cancel</button>
                </div>
                {alertMessage && (
                    <div style={alertStyle(alertType)}>
                        {alertMessage}
                    </div>
                )}
                <ul>
                    {messages.map((message) => (
                        <li key={message._id} style={listItemStyles}>
                            <p>{message.message}</p>
                            <div style={buttonContainerStyles}>
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
                            </div>
                        </li>
                    ))}
                </ul>
                <form
                    id="paymentForm"
                    style={formStyle}
                    onSubmit={handleSubmitPayment}
                >
                    <div style={{ margin: '10px' }}>
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
        </div>
    );
};

const modalStyles = (isOpen: boolean) => ({
    display: isOpen ? 'block' : 'none',
    position: 'fixed' as const,
    zIndex: 1000,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto' as const,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

const modalContentStyles = {
    backgroundColor: '#fefefe',
    margin: '10% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '60%',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
};

const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '20px',
};

const closeButtonStyles = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
};

const listItemStyles = {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
};

const buttonStyle = (bgColor: string) => ({
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
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

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
};

const alertStyle = (type: 'success' | 'error' | null) => ({
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    color: type === 'success' ? 'green' : 'red',
    backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
    border: type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
});

export default CartPopup;
