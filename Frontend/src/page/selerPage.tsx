import { useEffect, useState } from 'react';
import UserNavigation from '../Navigations/userNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import registerImage from '../assets/pngegg (7).png';

interface Sealers {
  firstname: string;
  lastname: string;
  email: string;
  nic: string;
  phone: string;
  _id: string;
}

export default function SelerPage() {
  const [sealers, setSealers] = useState<Sealers[]>([]);

  useEffect(() => {
    const fetchSealers = async () => {
      try {
        const response = await fetch('http://localhost:5001/SSABS/user/userhome/selerPage');
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setSealers(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSealers();
  }, []);

  return (
    <div>
      <UserNavigation />
      <h1>Seler Page</h1>
      <div className="container bg-black rounded-5 p-5  mt-lg-5  ">
        <div className="row justify-content-center">
          {sealers.map((sealer: Sealers) => (
            <div className="card bg-gray m-lg-3 rounded-3   col-lg-3 d-flex flex-row " key={sealer._id}>
              <div className="card-body ">
                <img src={registerImage} className="img-fluid" alt="..." />
                <h5>First Name: {sealer.firstname}</h5>
                <h5>Last Name: {sealer.lastname}</h5>
                <h5>Email: {sealer.email}</h5>
                <h5>National Id Card: {sealer.nic}</h5>
                <h5>Contact Numebr: {sealer.phone}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
