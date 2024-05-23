import React from 'react';
import './details.css';
import UserNavigation from '../Navigations/userNav';
import Shrimp5 from '../assets/Shrimp5.jpeg';

export default function details() {
  return (
    <div className="container">
      <UserNavigation/>
      
      <main className="main">
        <h1>Kandalama in Dambulla</h1>
        <div className="content">
          <img src={Shrimp5} className="image" />
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Quantity</th>
                <th>UnitPrice</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0-350g</td>
                <td>10</td>
                <td></td>
                <td><button className="buy-button">buy</button></td>
              </tr>
              <tr>
                <td>350-700g</td>
                <td>15</td>
                <td></td>
                <td><button className="buy-button">buy</button></td>
              </tr>
              <tr>
                <td>700-1000g</td>
                <td>17</td>
                <td>98</td>
                <td><button className="buy-button">buy</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      
    </div>
  );
}


