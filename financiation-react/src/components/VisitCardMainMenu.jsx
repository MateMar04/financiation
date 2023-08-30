import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import "../assets/styles/VisitCardMainMenu.css"

export const VisitCardMainMenu = () => {
    return (
        <Container flex className="visit-container">
            <Row className="visit-row">
                <Col lg={7}>
                    <h5 className="visit-title">SUCO 10-08-2023</h5>
                </Col>
                <Col lg={5}>
                    <Row className="status-row">
                        <Col lg={10}>
                            <p className="visit-title">Confirmada</p>
                        </Col>
                        <Col lg={2}>
                            <a className="circle_green"></a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default VisitCardMainMenu;
