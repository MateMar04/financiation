import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import '../assets/styles/LoginPage.css'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Card} from "react-bootstrap";
import verifyimg from '../assets/images/verifyimg.gif';

const ActivateAccountPage = () => {
    return (
        <div className='container mt-5'>

            <Container fluid>
                <Row className='justify-content-center'>
                    <Col md='6'>
                        <Card>
                            <Card.Body>
                                <Container fluid>
                                    <img src={verifyimg} alt="" className='verifyimg'/>
                                </Container>
                                <Row>
                                    <h3>Verifique su cuenta</h3>
                                </Row>
                                <div className='py-2'>
                                    <Row>
                                        <Col>
                                            <Button>Verificar</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ActivateAccountPage