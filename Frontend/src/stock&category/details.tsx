import React from 'react'
import UserNavigation from '../Navigations/userNav'
import Form from "react-bootstrap/Form";
import { Col, Image, Row } from 'react-bootstrap'
import Shrimp6 from "../assets/Shrimp6.jpg";
import Button from 'react-bootstrap/Button';

export default function details() {
  return (
    <Form>
        <UserNavigation/>
        <h1>Kandalama in Dambulla</h1>
        <br></br>
        <Form.Group className="mb-3" controlId="formBasic">
        <Row>
                    <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={Shrimp6} rounded style={{width:"200px",height:"200px"}}/>
                    </Col>

                    <Row>
                        <col>
                        <h5>Category</h5>
                        </col>

                        <col>
                        <h5>Quantity</h5>
                        </col>

                        <col>
                        <h5>Unit Price</h5>
                        </col>
                    </Row>

                    <Row>
                        <col>
                        <h6>0-350g</h6>
                        </col>

                        <col>
                        <input type='text'placeholder=''></input>
                        </col>

                        <col>
                        <input type='text'placeholder=''></input>
                        </col>

                        <Col >
                        <Button variant="primary">Buy</Button>{''}
                        </Col>
                    </Row>
                    <Row>
                        <col>
                        <h6>0-700g</h6>
                        </col>

                        <col>
                        <input type='text'placeholder=''></input>
                        </col>

                        <col>
                        <input type='text'placeholder=''></input>
                        </col>

                        <Col >
                        <Button variant="primary">Buy</Button>{''}
                        </Col>
                    </Row>
                    <Row>
                        <col>
                        <h6>0-1kg</h6>
                        </col>

                        <col>
                        <input type='text'placeholder=''></input>
                        </col>

                        <col>
                        <input type='text'placeholder=''></input>
                        </col>

                        <Col >
                        <Button variant="primary">Buy</Button>{''}
                        </Col>
                    </Row>
        </Row>


         </Form.Group>
    </Form>
  )
}


