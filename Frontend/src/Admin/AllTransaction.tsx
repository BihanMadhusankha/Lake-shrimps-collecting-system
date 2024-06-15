import React, { useEffect, useState } from 'react';
import AdminNavigation from './AdminNAvigation'; // Fixed the typo in the component name
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Receipt {
    _id: string;
    sellerId: string;
    message: string;
    createdAt: Date;
}

const AllTransactionsPage: React.FC = () => {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const response = await axios.get('http://localhost:5001/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });

                if (!response.data) {
                    setIsLoggedIn(false);
                    localStorage.removeItem('accessToken');
                } else {
                    setIsLoggedIn(true);
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

    useEffect(() => {
        if (isLoggedIn) {
            fetchAllReceipts();
        }
    }, [isLoggedIn]);

    const fetchAllReceipts = async () => {
        try {
            const response = await axios.get<Receipt[]>('http://localhost:5001/SSABS/admin/alltransaction', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setReceipts(response.data);
        } catch (error) {
            console.error('Error fetching receipts:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5001/SSABS/admin/receipt/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setReceipts(receipts.filter(receipt => receipt._id !== id));
        } catch (error) {
            console.error('Error deleting receipt:', error);
        }
    };

    const handleDownloadPDF = async () => {
        const input = document.getElementById('receiptTable');
        if (input) {
            const deleteButtons = input.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                (button as HTMLElement).style.display = 'none';
            });
    
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
    
            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 0, 0, 200, 100);
    
            pdf.save('receipts.pdf');
    
            deleteButtons.forEach(button => {
                (button as HTMLElement).style.display = 'inline-block';
            });
        }
    };

    return (
        <div>
            <AdminNavigation />
            <div className="container">
                <h1 className="text-center">All Transactions</h1>
                <button 
                    onClick={handleDownloadPDF} 
                    style={buttonStyle('#007bff')}
                >
                    Download PDF
                </button>
                <table id="receiptTable" className="table table-striped mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Seller ID</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ counterReset: 'none' }}>
                        {receipts.map((receipt, index) => (
                            <tr key={receipt._id}>
                                <td>{index + 1}</td>
                                <td>{receipt.sellerId}</td>
                                <td>{receipt.message}</td>
                                <td>{new Date(receipt.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(receipt._id)}
                                        style={buttonStyle('#dc3545')}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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

export default AllTransactionsPage;
