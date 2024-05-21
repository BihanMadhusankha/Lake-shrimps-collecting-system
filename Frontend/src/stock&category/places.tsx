import { Col, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Shrimp1 from "../assets/Shrimp1.jpg";
import Shrimp2 from "../assets/Shrimp2.jpg";
import Shrimp3 from "../assets/Shrimp3.jpg";
import Shrimp4 from "../assets/Shrimp4.jpg";
import React from 'react';
import UserNavigation from '../Navigations/userNav';
import './places.css';



function Places(){
    return(
        <Form>
            <UserNavigation/>
            <br></br>
            <br></br>
             <Form.Group className="mb-3" controlId="formBasic">
                <Row>
                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={Shrimp1} className='image'/>
                    </Col>

                    <Col >
                     <Button className="button2"  variant="primary">More</Button>{' '}
                    </Col>

                    <Col>
                    <Image src={Shrimp2} className='image'/>
                    </Col>

                    <Col >
                     <Button className="button2" variant="primary">More</Button>{' '}
                    </Col>    
                </Row>
                <Row>
                <Col>
                <div className='description1'>
                    <h6>Pavatkulam-Vavuniya</h6>
                    <h6>20kg</h6>
                    <h6>02/05/2024</h6>
                    </div>
                </Col>

                <Col>
                <div className='description2'>
                    <h6>Kandalama-Dambulla</h6>
                    <h6>25kg</h6>
                    <h6>02/05/2024</h6>
                    </div>
                </Col>
                </Row>
                <br></br>
                <Row>
                <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={Shrimp3} className='image'/>
                    </Col>

                    <Col >
                     <Button className='button2' variant="primary">More</Button>{' '}
                    </Col>

                    <Col>
                    <Image src={Shrimp4} className='image'/>
                    </Col>

                    <Col >
                     <Button className='button2' variant="primary">More</Button>{' '}
                    </Col>   
                </Row>
                <Row>
                <Col>
                <div className='description1'>
                    <h6>Minneriya-Dambulla</h6>
                    <h6>20kg</h6>
                    <h6>02/05/2024</h6>
                    </div>
                </Col>

                <Col>
                <div className='description2'>
                    <h6>Kurunegala-Kurunegala</h6>
                    <h6>25kg</h6>
                    <h6>02/05/2024</h6>
                    </div>
                </Col>
                </Row>
                </Form.Group>
        </Form>
    )
}
export default Places

