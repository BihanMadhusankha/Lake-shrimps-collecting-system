import { Col, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Shrimp1 from "../assets/Shrimp1.jpg";
import Shrimp2 from "../assets/Shrimp2.jpg";
import Shrimp3 from "../assets/Shrimp3.jpg";
import Shrimp4 from "../assets/Shrimp4.jpg";
import React from 'react';
import UserNavigation from '../Navigations/userNav';



function Places(){
    return(
        <Form>
            <UserNavigation></UserNavigation>
            <br></br>
             <Form.Group className="mb-3" controlId="formBasic">
                <Row>
                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={Shrimp1} rounded style={{width:"200px",height:"200px"}}/>
                    </Col>

                    <Col >
                     <Button variant="primary">More</Button>{' '}
                    </Col>

                    <Col>
                    <Image src={Shrimp2} rounded style={{width:"200px",height:"200px"}}/>
                    </Col>

                    <Col >
                     <Button variant="primary">More</Button>{' '}
                    </Col>    
                </Row>
                <Row>
                <Col>
                    <h6>Pavatkulam-Vavuniya</h6>
                    <h6>20kg</h6>
                    <h6>02/05/2024</h6>
                </Col>

                <Col>
                    <h6>Kandalama-Dambulla</h6>
                    <h6>25kg</h6>
                    <h6>02/05/2024</h6>
                </Col>
                </Row>
                <br></br>
                <Row>
                <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={Shrimp3} rounded style={{width:"200px",height:"200px"}}/>
                    </Col>

                    <Col >
                     <Button variant="primary">More</Button>{' '}
                    </Col>

                    <Col>
                    <Image src={Shrimp4} rounded style={{width:"200px",height:"200px"}}/>
                    </Col>

                    <Col >
                     <Button variant="primary">More</Button>{' '}
                    </Col>   
                </Row>
                <Row>
                <Col>
                    <h6>Minneriya-Dambulla</h6>
                    <h6>20kg</h6>
                    <h6>02/05/2024</h6>
                </Col>

                <Col>
                    <h6>Kurunegala-Kurunegala</h6>
                    <h6>25kg</h6>
                    <h6>02/05/2024</h6>
                </Col>
                </Row>
                </Form.Group>
        </Form>
    )
}
export default Places

