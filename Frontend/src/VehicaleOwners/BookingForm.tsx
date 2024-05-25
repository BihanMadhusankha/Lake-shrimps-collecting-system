// BookingForm.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookingForm: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5001/SSABS/user/book-vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vehicleId, name, date }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Booking successful!');
      navigate(`/SSABS/user/dailyproducts/${vehicleId}`);
        } else {
      alert(`Booking failed: ${data.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Book Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="vehicleId" className="form-label">Vehicle ID</label>
          <input type="text" className="form-control" id="vehicleId" value={vehicleId} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Booking Date</label>
          <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default BookingForm;
