import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SealerNav from './sealerNav';

interface Request {
  _id: string;
  productId: string;
  address: string;
  city: string;
  deliveryOption: string;
  quantity: number;
  totalAmount: number;
  sellerId: string;
  status: string;
  userId: string;
}

interface Payment {
  _id: string;
  sellerId: string;
  photoUrl: string;
}

const SellerRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    totalPayment: '',
  });
  const [formErrors, setFormErrors] = useState({
    accountNumber: '',
    bankName: '',
    ifscCode: '',
  });
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
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
          fetchSellerRequests();
          fetchPaymentReceipts();
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

  const fetchSellerRequests = async () => {
    try {
      const response = await axios.get<Request[]>('http://localhost:5001/SSABS/seller/requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const fetchPaymentReceipts = async () => {
    try {
      const response = await axios.get<Payment[]>('http://localhost:5001/SSABS/seller/receipt', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  };

  const handleAccept = async (request: Request) => {
    setSelectedRequest(request);
    setShowForm(true);
  };

  const validateForm = () => {
    const errors = { accountNumber: '', bankName: '', ifscCode: '' };
    let isValid = true;

    if (!/^\d{10,16}$/.test(accountDetails.accountNumber)) {
      errors.accountNumber = 'Account number should be 10-16 digits long.';
      isValid = false;
    }

    if (!/^[a-zA-Z ]+$/.test(accountDetails.bankName) || accountDetails.bankName.trim() === '') {
      errors.bankName = 'Bank name should only contain letters and should not be empty.';
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async () => {
    if (selectedRequest && validateForm()) {
      try {
        const response = await axios.post(
          `http://localhost:5001/SSABS/seller/requests/accept/${selectedRequest._id}/${selectedRequest.userId}/${selectedRequest.sellerId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );

        setRequests(prevRequests =>
          prevRequests.map(request =>
            request._id === selectedRequest._id ? { ...request, status: 'Accepted' } : request
          )
        );

        setAlert({ message: 'Request accepted successfully!', type: 'success' });

        await deleteRequest(selectedRequest._id);

        setShowForm(false);
        setSelectedRequest(null);
      } catch (error) {
        console.error('Error accepting request:', error);
        setAlert({ message: 'Failed to accept the request. Please try again.', type: 'error' });
      }
    }
  };

  const deleteRequest = async (requestId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/SSABS/seller/requests/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      setRequests(prevRequests =>
        prevRequests.filter(request => request._id !== requestId)
      );

      console.log('Request deleted:', response.data);
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/SSABS/seller/requests/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      setRequests(prevRequests =>
        prevRequests.filter(request => request._id !== requestId)
      );

      console.log('Request rejected:', response.data);
      setAlert({ message: 'Request rejected successfully!', type: 'success' });
    } catch (error) {
      console.error('Error rejecting request:', error);
      setAlert({ message: 'Failed to reject the request. Please try again.', type: 'error' });
    }
  };

  const handleAcceptReceipt = async (payment: Payment) => {
    try {
      console.log('Accepted payment receipt:', payment);
    } catch (error) {
      console.error('Error accepting payment receipt:', error);
    }
  };

  const handleRejectReceipt = async (paymentId: string) => {
    try {
      console.log('Rejected payment receipt with ID:', paymentId);
    } catch (error) {
      console.error('Error rejecting payment receipt:', error);
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div>
      <SealerNav />
      {alert && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: alert.type === 'success' ? '#28a745' : '#dc3545',
            color: 'white',
            zIndex: 1000,
          }}
        >
          {alert.message}
        </div>
      )}
      <div className='d-flex flex-row' style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <div className='col-6'>
          <h2 className='d-flex justify-content-center mt-4' style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>My Requests</h2>
          {requests.length > 0 ? (
            requests.map(request => (
              <div
                key={request._id}
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                  backgroundColor: '#fff',
                  margin: '10px',
                }}
              >
                <p><strong>Product:</strong> {request.productId}</p>
                <p><strong>Address:</strong> {request.address}</p>
                <p><strong>City:</strong> {request.city}</p>
                <p><strong>Delivery Option:</strong> {request.deliveryOption}</p>
                <p><strong>Quantity:</strong> {request.quantity} KG</p>
                <p><strong>Total Amount:</strong> ${request.totalAmount.toFixed(2)}</p>
                <p><strong>Status:</strong> {request.status}</p>
                <button
                  style={{
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    margin: '5px',
                  }}
                  onClick={() => handleAccept(request)}
                  disabled={request.status === 'Accepted' || request.status === 'Rejected'}
                >
                  Accept
                </button>
                <button
                  style={{
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    margin: '5px',
                  }}
                  onClick={() => handleReject(request._id)}
                  disabled={request.status === 'Accepted' || request.status === 'Rejected'}
                >
                  Reject
                </button>
              </div>
            ))
          ) : (
            <p>No pending requests found.</p>
          )}

          {showForm && selectedRequest && (
            <div
              style={{
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                margin: '10px',
              }}
            >
              <h3>Enter Account Details</h3>
              <label>
                Account Number:
                <input
                  type="text"
                  value={accountDetails.accountNumber}
                  onChange={(e) =>
                    setAccountDetails({ ...accountDetails, accountNumber: e.target.value })
                  }
                />
                {formErrors.accountNumber && <p style={{ color: 'red' }}>{formErrors.accountNumber}</p>}
              </label>
              <br />
              <label>
                Bank Name:
                <input
                  type="text"
                  value={accountDetails.bankName}
                  onChange={(e) =>
                    setAccountDetails({ ...accountDetails, bankName: e.target.value })
                  }
                />
                {formErrors.bankName && <p style={{ color: 'red' }}>{formErrors.bankName}</p>}
              </label>
              <br />
              <label>
                IFSC Code:
                <input
                  type="text"
                  value={accountDetails.ifscCode}
                  onChange={(e) =>
                    setAccountDetails({ ...accountDetails, ifscCode: e.target.value })
                  }
                />
                {formErrors.ifscCode && <p style={{ color: 'red' }}>{formErrors.ifscCode}</p>}
              </label>
              <br />
              <button
                style={{
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  margin: '5px',
                }}
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>

        <div className='col-6'>
          <h2 className='d-flex justify-content-center mt-4'  style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Payment Receipts</h2>
          {payments.length > 0 ? (
            payments.map(payment => (
              <div
                key={payment._id}
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                  backgroundColor: '#fff',
                  margin: '10px',
                }}
              >
                <p><strong>Seller ID:</strong> {payment.sellerId}</p>
                <div>
                  <p><strong>Payment Receipt:</strong></p>
                  <img src={payment.photoUrl} alt="Payment Receipt" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
                <div>
                  <button
                    style={{
                      padding: '10px',
                      border: 'none',
                      borderRadius: '5px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      margin: '5px',
                    }}
                    onClick={() => handleAcceptReceipt(payment)}
                  >
                    Accept
                  </button>
                  <button
                    style={{
                      padding: '10px',
                      border: 'none',
                      borderRadius: '5px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      margin: '5px',
                    }}
                    onClick={() => handleRejectReceipt(payment._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No payment receipts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerRequests;


