import React from "react";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'


const asesores = []
const coordinadores = []
for (let i = 0; i <= 30; i++) {
    asesores.push(<p>Asesor {i}</p>)
    coordinadores.push(<p>Coordinador {i}</p>)
}


export const CreateGroupPage = () => {


    return (
        <Container fluid>
            <Card className='create-group-card'>
                <Row>
                    <Col>
                        <h3>Nombre del Grupo</h3>
                        <Form.Control placeholder='Nombre' type='text'></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className='create-group-column'>
                        <h3>Coordinador</h3>
                        <Container className='create-group-card-scroll'>
                            {coordinadores}
                        </Container>
                    </Col>
                    <Col lg={6} className='create-group-column'>
                        <h3>Asesores</h3>
                        <Container className='create-group-card-scroll'>
                            {asesores}
                        </Container>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}
