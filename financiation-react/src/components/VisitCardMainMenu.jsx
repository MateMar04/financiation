import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import "../assets/styles/VisitCardMainMenu.css"

export const VisitCardMainMenu = () => {
    return (
        <Container className="visit-container">
            <Row className="visit-row">
                <Col lg={8}>
                    <h5 className="visit-title">SUCO 10-08-2023</h5>
                </Col>
                <Col lg={4}>
                    <Row>
                        <Col lg={8}>
                            <p>Confirmada</p>
                        </Col>
                        <Col lg={4}>
                            <a className="circle_green"></a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default VisitCardMainMenu;
