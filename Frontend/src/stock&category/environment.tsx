import React from 'react'
import UserNavigation from '../Navigations/userNav'
import Form from "react-bootstrap/Form";
import { Col, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import env1 from "../assets/env1.jpg";
import env2 from "../assets/env2.jpg";
import env3 from "../assets/env3.jpg";

export default function environment() {
  return (
    <Form>
      <UserNavigation/>
      <h1>Environments</h1>
      <br></br>
             <Form.Group className="mb-3" controlId="formBasic">
                <Row>
                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={env1} rounded style={{width:"200px",height:"200px"}}/>
                    </Col>

                    <Col>
                    <Image src={env3} rounded style={{width:"200px",height:"200px"}}/>
                    </Col>

                    <Col>
                    <Image src={env2} rounded style={{width:"200px",height:"200px"}}/>
                    </Col>             
                </Row>
                <br></br>
                <Row>
                    <Col >
                     <Button variant="primary">Marine</Button>{' '}
                    </Col>

                    <Col>
                    <Button variant="primary">Lakes</Button>{' '}
                    </Col>

                    <Col >
                     <Button variant="primary">Tanks</Button>{' '}
                    </Col>  
                </Row>
             </Form.Group>
    </Form>
      
      
    
  )
}
