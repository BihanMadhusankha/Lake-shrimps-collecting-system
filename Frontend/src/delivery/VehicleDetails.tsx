import React from 'react';
import {
 
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import UserNavigation from '../Navigations/userNav';
import DetailsImage from './../assets/bike.jpg';




export default function App(): JSX.Element {
  return (
    <div>
      <UserNavigation/>
    
    <MDBRow className="align-items-center">
      <MDBCol lg={8} md={12} className='mb-4 mb-lg-0 d-flex justify-content-between align-items-start'>
        <img
          src={DetailsImage}
          alt="Image"
          className="Image-container"
          style={{ width: '75%', height: 'auto' }} // Adjust the width as needed
        />
        <div className="ml-3">
        <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3</li>
          </ul>
       <br></br>
    <p><b>Do you want to delivery?</b></p>
    <br></br>
   
        </div>
      </MDBCol>
    </MDBRow>
    </div>
  );
}
