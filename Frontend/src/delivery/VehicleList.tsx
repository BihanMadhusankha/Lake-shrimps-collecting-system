import React, { useState } from 'react';
import {
  MDBCol,
  MDBRow,
  
} from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import LorryImage from './../assets/lorry3.jpg';
import BikeImage from './../assets/bike.jpg';
import ThreeImage from './../assets/download.jpeg';
import Lorry1Image from './../assets/images.jpeg';
import VehicleImage from './../assets/lorry2.jpg';
import NewImage from './../assets/scoter.jpg';









export default function VehicleList(): JSX.Element {
  const [modal1, setModal1] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);

  return (
    <>
     <div className="page-container"></div>
    <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>List Of Vehicles</h1>
    
      <MDBRow>
        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
          <div className="image-container">
          <img src={LorryImage}alt="Image" className="Image-container" style={{ width: '50%', height: 'auto' }} />
             </div>
            <a style={{ cursor: 'pointer' }} onClick={() => setModal1(true)}>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a><br></br>
    <Button variant="contained" disableElevation>
      see more....
    </Button>
  

          </div>
        </MDBCol>

        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
          <div className="image-container">
          <img src={BikeImage} alt="Image" className="Image-container" style={{ width: '50%', height: 'auto' }} />
             </div>
            <a style={{ cursor: 'pointer' }} onClick={() => setModal2(true)}>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a>
            <Button variant="contained" disableElevation>
      see more....
    </Button>
          </div>
        </MDBCol>

        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
          <div className="image-container">
          <img src={Lorry1Image}alt="Image" className="Image-container" style={{ width: '50%', height: 'auto' }} />
             </div>            <a style={{ cursor: 'pointer' }} onClick={() => setModal3(true)}>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a>
            <Button variant="contained" disableElevation>
      see more....
    </Button>
          </div>
        </MDBCol>

        
        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
          <div className="image-container">
          <img src={ThreeImage} alt="Image" className="Image-container" style={{ width: '50%', height: 'auto' }} />
             </div>            
             <a style={{ cursor: 'pointer' }} onClick={() => setModal2(true)}>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a>
            <Button variant="contained" disableElevation>
      see more....
    </Button>
          </div>
        </MDBCol>

        
        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
          <div className="image-container">
          <img src={VehicleImage}alt="Image" className="Image-container" style={{ width: '50%', height: 'auto' }} />
             </div>
              <a style={{ cursor: 'pointer' }} onClick={() => setModal2(true)}>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a><br></br><br></br>
            <Button variant="contained" disableElevation>
      see more....
    </Button>
          </div>
        </MDBCol>

        
        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
          <div className="image-container">
          <img src={NewImage} alt="Image" className="Image-container" style={{ width: '50%', height: 'auto' }} />
             </div>           
              <a style={{ cursor: 'pointer' }} onClick={() => setModal2(true)}>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a>
            <Button variant="contained" disableElevation>
      see more....
    </Button>
          </div>
        </MDBCol>
      </MDBRow>
      
      

     
    </>
  );

  

}


