import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SealerNav from '../Sealer/sealerNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerImage from '../assets/pngegg (7).png';
import { Modal, Button, Form } from 'react-bootstrap';

interface VehicleOwner {
  firstname: string;
  lastname: string;
  email: string;
  nic: string;
  phone: string;
  _id: string;
}

interface Vehicle {
  licensePlate: string;
  vehicleType: string;
  photo: string;
  _id: string; // Assuming vehicle has an ID
}

const VehicleOwnerPage: React.FC = () => {
  const [vehicleOwners, setVehicleOwners] = useState<VehicleOwner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<VehicleOwner | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', contact: '',distance:'', date: '' });

  useEffect(() => {
    const fetchVehicleOwners = async () => {
      try {
        const response = await axios.get('http://localhost:5001/SSABS/vehicaleowner');
        setVehicleOwners(response.data.data);
      } catch (error) {
        console.error('Error fetching vehicle owners:', error);
      }
    };

    fetchVehicleOwners();
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (selectedOwner) {
        try {
          const response = await axios.get(`http://localhost:5001/SSABS/vehicaleown/${selectedOwner._id}`);
          setVehicles(response.data.data);
        } catch (error) {
          console.error('Error fetching vehicles:', error);
        }
      }
    };

    fetchVehicles();
  }, [selectedOwner]);

  const handleOwnerSelect = (owner: VehicleOwner) => {
    setSelectedOwner(owner);
  };

  const handleClose = () => {
    setSelectedOwner(null);
    setVehicles([]);
  };

  const handleBookVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setShowModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking details for vehicle ID: ${selectedVehicleId}\nName: ${bookingDetails.name}\nContact: ${bookingDetails.contact}\nDate: ${bookingDetails.date}`);
    // Here, you would typically send the bookingDetails to your server
    setShowModal(false);
    setBookingDetails({ name: '', contact: '',distance:'', date: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div>
      <SealerNav />
      <h1 className='d-flex justify-content-center mt-4'>Vehicle Owners</h1>
      <div className={`container rounded-5 p-5 mt-lg-5 ${selectedOwner ? 'blur-background' : ''}`}>
        <div className="row justify-content-center">
          {vehicleOwners.map((owner: VehicleOwner) => (
            <div className="card owner-card m-lg-3 rounded-3 col-lg-3" key={owner._id} onClick={() => handleOwnerSelect(owner)}>
              <div className="card-body">
                <img src={registerImage} className="img-fluid" alt="Owner" />
                <h5>First Name: {owner.firstname}</h5>
                <h5>Last Name: {owner.lastname}</h5>
                <h5>Email: {owner.email}</h5>
                <h5>National Id Card: {owner.nic}</h5>
                <h5>Contact Number: {owner.phone}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedOwner && (
        <div className="vehicle-list-overlay">
          <div className="container vehicle-list-container rounded-5 p-5 mt-lg-5">
            <h2>Vehicles belonging to {selectedOwner.firstname} {selectedOwner.lastname}</h2>
            <div className="row justify-content-center">
              {vehicles.map((vehicle: Vehicle, index: number) => (
                <div className="card vehicle-card m-lg-3 rounded-3 col-lg-3 d-flex flex-row" key={index}>
                  <div className="card-body">
                    <h5>License Plate: {vehicle.licensePlate}</h5>
                    <h5>Vehicle Type: {vehicle.vehicleType}</h5>
                    <img src={vehicle.photo} alt="Vehicle" className="vehicle-photo" />
                    <button className="btn btn-primary mt-3" onClick={() => handleBookVehicle(vehicle._id)}>Book Vehicle</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-danger" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBookingSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={bookingDetails.name} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="contact">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="contact" value={bookingDetails.contact} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="distance">
              <Form.Label>Distance(Km)</Form.Label>
              <Form.Control type="text" name="distance" value={bookingDetails.distance} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Booking Date</Form.Label>
              <Form.Control type="date" name="date" value={bookingDetails.date} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <style>{`
        .blur-background {
          filter: blur(5px);
        }
        .owner-card {
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .owner-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .vehicle-list-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.5s;
        }
        .vehicle-list-container {
          background: #fff;
          animation: slideIn 0.5s;
        }
        .vehicle-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .vehicle-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .vehicle-photo {
          width: 100%;
          height: auto;
          transition: transform 0.3s ease;
        }
        .vehicle-photo:hover {
          transform: scale(1.1);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default VehicleOwnerPage;
