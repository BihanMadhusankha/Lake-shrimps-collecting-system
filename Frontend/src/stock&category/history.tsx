import React from 'react'
import Form from "react-bootstrap/Form";
import UserNavigation from '../Navigations/userNav'
import { Col, Image, Row } from 'react-bootstrap'
import Shrimp1 from "../assets/Shrimp1.jpg";
import Shrimp2 from "../assets/Shrimp2.jpg";
import Shrimp3 from "../assets/Shrimp3.jpg";
import Shrimp4 from "../assets/Shrimp4.jpg";
import Button from 'react-bootstrap/Button';

export default function history() {
  return (
    <Form>
      <UserNavigation/>
      <br></br>
      <div className='title'>
      <h1>History</h1>
      </div>
      <div className='date'>
      <label >Select Date:-</label>
      <input type='text'></input>
      </div>
      <br></br>
      <br></br>
      
      <Form.Group className="mb-3" controlId="formBasic">
                <Row>
                <div className="image-container">
                    <Col xs={3} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={Shrimp1} className='image1'/>
                    </Col>

                    <Col xs={3} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={Shrimp2} className='image1'/>
                    </Col>

                    <Col xs={3} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={Shrimp3} className='image1'/>
                    </Col>  

                    <Col xs={3} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={Shrimp4} className='image1'/>
                    </Col>  
                    </div>           
                </Row>
                <Row>
                <Col>
                <div className='description1'>
                    <h6>Pavatkulam-Vavuniya</h6>     
                    </div>
                </Col>

                <Col>
                <div className='description2'>
                    <h6>Kandalama-Dambulla</h6>
                    </div>                 
                </Col>

                <Col>
                <div className='description1'>
                    <h6>Kurunegala-Kurunegala</h6>     
                    </div>
                </Col>

                <Col>
                <div className='description1'>
                    <h6>Minneriya-Dambulla</h6>     
                    </div>
                </Col>
                </Row>
                <Row>
                    <Col xs={3} style={{display: 'flex', justifyContent: 'center'}}  >
                     <Button className='button1' variant="primary" >Remove</Button>{''}
                    </Col>

                    <Col xs={3} style={{display: 'flex', justifyContent: 'center'}}>
                    <Button className='button1' variant="primary">Remove</Button>{' '}
                    </Col>

                    <Col xs={3} style={{display: 'flex', justifyContent: 'center'}}>
                     <Button className='button1' variant="primary">Remove</Button>{' '}
                    </Col> 

                     <Col xs={3} style={{display: 'flex', justifyContent: 'center'}}>
                     <Button className='button1' variant="primary">Remove</Button>{' '}
                    </Col>                     

                    <Col>
                    <br />
                     <Button className='button2' variant="primary">Remove All</Button>{' '}
                    </Col>  
                </Row>
       </Form.Group>
      
     

    </Form>
      
   
        

   
   
    
  )
}
