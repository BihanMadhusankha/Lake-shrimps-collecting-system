import React from 'react'
import UserNavigation from '../Navigations/userNav'
import Form from "react-bootstrap/Form";
import { Col, Image, Row } from 'react-bootstrap'
import Shrimp5 from '/src/assets/Shrimp5.jpeg';
import Button from 'react-bootstrap/Button';

export default function harvest() {
  return (
   <Form>
    <UserNavigation/>
    <h1>Daily Harvest</h1>
    <h5>Date:-</h5>
   
    <Form.Group className="mb-3" controlId="formBasic">
        <Row>
            <Row>
            <col>
            <h6>Marine:-</h6>

            </col>

            <col>
            <h6>Lakes:-</h6>

            </col>

            <col>
            <h6>Tanks:-</h6>

            </col>
            </Row>

             <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
             <Image src={Shrimp5} rounded style={{width:"200px",height:"200px"}}/>
             </Col>
        </Row>
        </Form.Group>

        <h2>Today Full Harvest</h2>


        <Button variant="primary">History</Button>{''}
   </Form>
  )
}
