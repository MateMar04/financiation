import { Col, Container, Row } from "react-bootstrap";
import React from "react";
import "../assets/styles/VisitCardMainMenu.css"

export const VisitCardMainMenu = ({name, status}) => {
    return (
        <Container className="visit-container d-flex">
            <Row className="visit-row">
                <Col lg={7} >
                    <p className="visit-title">{name}</p>
                </Col>

                <Col lg={5}>
                <Row className="status-row">
                <Col xs={5} md={9} className="justify-content-start d-flex align-items-center">
                    <p className="visit-title text-center">{status}</p>
                </Col>
                <Col xs={1} md={1} className="justify-content-end">
                    {status === 'Finalizada' && (
                        <a className="circle_green text-center"></a>
                    )}
                    {status === 'Pendiente' && (
                        <a className="circle_red text-center"></a>
                    )}
                    {status === 'En proceso' && (
                        <a className="circle_orange text-center"></a>
                    )}
                    {status === 'No Confirmada' && (
                        <a className="circle_red text-center"></a>
                    )}
                </Col>
            </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default VisitCardMainMenu;
