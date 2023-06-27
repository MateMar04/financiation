import {Card, Col, Container, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";

export const VisitCard = ({visit}) => {
    return (
        <Card>
            <Card.Header><h3>{visit.name}</h3></Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                       <Col>
                           <h5>Localidad:</h5>
                       </Col>
                       <Col>
                           <p>{visit.id_locality}</p>
                       </Col>
                    </Row>
                    <Row>
                        <Col>
                           <h5>Tiempo de Viaje:</h5>
                       </Col>
                       <Col>
                           <p>{visit.travel_time}</p>
                       </Col>
                    </Row>
                    <Row>
                        <Col>
                           <h5>Distancia:</h5>
                       </Col>
                       <Col>
                           <p>{visit.distance}</p>
                       </Col>
                    </Row>
                    <Row>
                        <Col>
                           <h5>Fecha de Visita:</h5>
                       </Col>
                       <Col>
                           <p>{visit.visit_date}</p>
                       </Col>
                    </Row>
                    <Row>
                        <Col>
                           <h5>Nombre del Lugar:</h5>
                       </Col>
                       <Col>
                           <p>{visit.place_name}</p>
                       </Col>
                    </Row>
                    <Row>
                        <Col>
                           <h5>Grupo:</h5>
                       </Col>
                       <Col>
                           <p>{visit.id_group}</p>
                       </Col>
                    </Row>
                    <Row>
                        <Col>
                           <h5>Status:</h5>
                       </Col>
                       <Col>
                           <p>{visit.id_visit_status}</p>
                       </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}
