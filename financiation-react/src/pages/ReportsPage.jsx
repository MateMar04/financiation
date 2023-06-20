import React from 'react'
import {Col, Container, Form, Row} from "react-bootstrap";
import "../assets/styles/ReportsPage.css"


const rows = []
for (let i = 0; i <= 30; i++) {
    rows.push(
        <Row key={i}>
            <Col lg={6}>
                <Form.Label>Ciudad {i}</Form.Label>
            </Col>
            <Col lg={6}>
                <Form.Check></Form.Check>
            </Col>
        </Row>)
}


export const ReportsPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col lg='4'>
                    <Container className='red'>
                        <h1 className='title'>Selecciona Localidad</h1>
                        <Form>
                            {rows}
                        </Form>
                    </Container>
                </Col>
                <Col lg='8'>
                    <Container className='green'></Container>
                    <Container className='yellow'></Container>
                </Col>
            </Row>
        </Container>
    )
}

export default ReportsPage
