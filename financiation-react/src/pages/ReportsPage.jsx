import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import "../assets/styles/ReportsPage.css"

export const ReportsPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col lg='4' className='red'>
                    <Container>

                    </Container>
                </Col>
                <Col lg='8' className='blue'>
                    <Container className='green'></Container>
                    <Container className='yellow'></Container>
                </Col>
            </Row>
        </Container>
    )
}
