import { Col, Container, Row } from "react-bootstrap";
import React from "react";
import "../assets/styles/VisitCardMainMenu.css"

export const VisitCardMainMenu = ({name, status}) => {
    return (
        <Container flex className="visit-container">
            <Row className="visit-row">
                <Col lg={7} >
                    <p className="visit-title">{name}</p>
                </Col>

                <Col lg={5} >
                    <Row className="status-row">
                        <Col xs={5} md={9} className="justify-content-start d-flex align-items-center">
                            <p className="visit-title">{status}</p>
                        </Col>
                        <Col xs={1} md={1} className="justify-content-end">
                            <a className="circle_green"></a>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default VisitCardMainMenu;
