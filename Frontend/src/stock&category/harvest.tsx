import React from 'react';
import './harvest.css';
import UserNavigation from '../Navigations/userNav';
import Shrimp5 from '../assets/Shrimp5.jpeg'; 
import Shrimp9 from '../assets/Shrimp9.jpeg'; 
import Shrimp10 from '../assets/Shrimp10.jpeg'; 
import {  Row } from 'react-bootstrap'

export default function harvest(){
  return (
    <div className="container">
      <UserNavigation />
      <main className="main">
        <h1>Daily Harvest</h1>
        <div className="content">
          
            <p>Date:- ____________</p>
            <Row>
            <img src={Shrimp5} alt="Seafood" className="image" />
            <img src={Shrimp9} alt="Seafood" className="image" />
            <img src={Shrimp10} alt="Seafood" className="image" />
            </Row>
            <p>Marine:- ____________</p>
            <p>Lakes :- ____________</p>
            <p>Tanks :- ____________</p>
          
          
        </div>
        <h2>Today Full Harvest</h2>
        <div className="full-harvest">
          <div className="placeholder"></div>
        </div>
        <button className="history-button">History</button>
      </main>
      
    </div>
  );
}


