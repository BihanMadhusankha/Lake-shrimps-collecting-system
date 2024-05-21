import { useEffect, useState } from 'react';
import UserNavigation from '../Navigations/userNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import registerImage from '../assets/pngegg (7).png';

interface Vehicale {
  firstname: string;
  lastname: string;
  email: string;
  nic: string;
  phone: string;
  _id: string;
}

export default function VehicleOwnerPage() {
  const [vehicalown, setVehicaleOwn] = useState<Vehicale[]>([]);

  useEffect(() => {
    const fetchVehicaleOwner = async () => {
      try {
        const response = await fetch('http://localhost:5001/SSABS/user/userhome/vehicaleowner');
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setVehicaleOwn(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVehicaleOwner();
  }, []);

  return (
    <div>
      <UserNavigation />
      <h1>Vehical Owners</h1>
      <div className="container bg-black rounded-5 p-5 mt-lg-5">
        <div className="row justify-content-center">
          {vehicalown.map((vehicaleowns: Vehicale) => (
            <div className="card bg-gray m-lg-3 rounded-3 col-lg-3 d-flex flex-row" key={vehicaleowns._id}>
              <div className="card-body">
                <img src={registerImage} className="img-fluid" alt="..." />
                <h5>First Name: {vehicaleowns.firstname}</h5>
                <h5>Last Name: {vehicaleowns.lastname}</h5>
                <h5>Email: {vehicaleowns.email}</h5>
                <h5>National Id Card: {vehicaleowns.nic}</h5>
                <h5>Contact Number: {vehicaleowns.phone}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}