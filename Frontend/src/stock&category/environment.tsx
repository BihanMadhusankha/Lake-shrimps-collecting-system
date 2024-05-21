import React from 'react'
import UserNavigation from '../Navigations/userNav'
import Form from "react-bootstrap/Form";
import { Col, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import env1 from "../assets/env1.jpg";
import env2 from "../assets/env2.jpg";
import env3 from "../assets/env3.jpg";
import './environment.css';


export default function environment() {
  return (
    <Form>
      <UserNavigation/>
      <br></br>
      <div className='title'>
      <h1>Environments</h1>
      
      </div>
      <br></br>
      <br></br>
             <Form.Group className="mb-3" controlId="formBasic">
                <Row>
                <div className="image-container">
                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={env1} className='image1'/>
                    </Col>

                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={env2} className='image1'/>
                    </Col>

                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={env3} className='image1'/>
                    </Col>  
                    </div>           
                </Row>
               
                <Row>
                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}  >
                     <Button className='button1' variant="primary" >Marine</Button>{''}
                    </Col>

                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Button className='button1' variant="primary">Lakes</Button>{' '}
                    </Col>

                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                     <Button className='button1' variant="primary">Tanks</Button>{' '}
                    </Col>  
                </Row>
             </Form.Group>
    </Form>
      
      
    
  )
}
