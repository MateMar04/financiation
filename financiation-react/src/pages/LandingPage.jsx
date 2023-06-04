import React from 'react';
import '../assets/styles/LandingPage.css'
import imagenPanal from '../assets/images/panal.jpg'
import LOGOGOBIERNO from "../assets/images/LOGOGOBIERNO.png";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

const LandingPage = () => {
    return (
        <Container fluid className='general'>
            <Row className="contenedor-imagen">
                <Col lg='6'>
                    <img src={imagenPanal} alt="" className="imagen"/>
                </Col>
                <Col lg='6' className="informacion">
                    <Container fluid className="carta">
                        <Card>
                            <Container>
                                <img src={LOGOGOBIERNO} alt="React Logo" className="img-fluid"/>
                            </Container>
                            <hr/>
                            <Container className="contenedor">
                                <p>Si todavia no tenes una cuenta puede crearte una</p>
                                <Button className='boton'>Crear</Button>
                            </Container>
                            <hr/>
                            <Container className="contenedor">
                                <p>Si ya tienes una cuenta accede</p>
                                <Button className='boton'>Acceder</Button>
                            </Container>
                        </Card>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default LandingPage