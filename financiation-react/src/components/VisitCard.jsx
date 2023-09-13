import { Card, Col, Container, Row } from "react-bootstrap";
import "../assets/styles/VisitCard.css"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Zoom } from "@mui/material";

export const VisitCard = ({ visit }) => {
    return (

        <Container className='CompletlyContainer'>
            <Zoom in>
                <div>
                    <Accordion className={'accordion-visits'}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon fontSize="large" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="AccordionSummary"
                        >
                            <Typography sx={{ width: '70%' }} className="VisitName text-start"><h6>
                                {visit.name}</h6>
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', width: '20%' }} className="text-end">Realizada</Typography>
                            <Typography sx={{ color: 'text.secondary', width: '10%' }}><a className="circle_green text-end"></a></Typography>




                        </AccordionSummary>

                        <AccordionDetails>
                            <Row className="row1">
                                <Col>
                                    <p>Id Localidad:</p>
                                </Col>
                                <Col>
                                    <p>{visit.id_locality}</p>
                                </Col>
                            </Row>
                            <Row className="row2 d-flex align-items-center ">
                                <Col className="d-flex align-items-center">
                                    <p>Tiempo de viaje:</p>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <p>{visit.travel_time} hs</p>
                                </Col>
                            </Row>
                            <Row className="row1">
                                <Col className="d-flex align-items-center">
                                    <p>Distancia:</p>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <p>{visit.distance} Km</p>
                                </Col>
                            </Row>
                            <Row className="row2">
                                <Col className="d-flex align-items-center">
                                    <p>Fecha de la visita:</p>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <p>{visit.visit_date}</p>
                                </Col>
                            </Row>
                            <Row className="row1">
                                <Col className="d-flex align-items-center">
                                    <p>Nombre del lugar:</p>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <p>{visit.place_name}</p>
                                </Col>
                            </Row>

                            <Row className="row2">
                                <Col className="d-flex align-items-center">
                                    <p>Grupo:</p>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <p>{visit.id_group}</p>
                                </Col>
                            </Row>
                            <Row className="row1">
                                <Col className="d-flex align-items-center">
                                    <p>Estado:</p>
                                    <Col className="d-flex align-items-center">
                                    </Col>
                                    <p>{visit.id_visit_status}</p>
                                </Col>
                            </Row>

                        </AccordionDetails>
                    </Accordion>
                </div>
            </Zoom >
        </Container >
    )
}
