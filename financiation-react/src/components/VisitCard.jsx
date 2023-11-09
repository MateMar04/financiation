import { Col, Container, Row } from "react-bootstrap";
import "../assets/styles/VisitCard.css"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Zoom } from "@mui/material";
import Button from '@mui/material/Button';

const DurationToTime = (duration) => {
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);
    let hours = 0;
    let minutes = 0;

    if (hoursMatch) {
        hours = parseInt(hoursMatch[1], 10);
    }

    if (minutesMatch) {
        minutes = parseInt(minutesMatch[1], 10);
    }

    const timeDate = new Date();
    timeDate.setHours(hours);
    timeDate.setMinutes(minutes);

    return timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

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
                            <Typography sx={{ color: 'text.secondary', width: '20%' }}
                                className="text-end">{visit.visit_status_name}</Typography>

                            {visit.visit_status_name === 'Finalizada' && (
                                <Typography sx={{ color: 'text.secondary', width: '10%' }}><a
                                    className="circle_green text-end"></a></Typography>
                            )}

                            {visit.visit_status_name === 'No Confirmada' && (
                                <Typography sx={{ color: 'text.secondary', width: '10%' }}><a
                                    className="circle_red text-end"></a></Typography>
                            )}
                            {visit.visit_status_name === 'Pendiente' && (
                                <Typography sx={{ color: 'text.secondary', width: '10%' }}><a
                                    className="circle_red text-end"></a></Typography>
                            )}

                            {visit.visit_status_name === 'En proceso' && (
                                <Typography sx={{ color: 'text.secondary', width: '10%' }}><a
                                    className="circle_orange text-end"></a></Typography>
                            )}




                        </AccordionSummary>

                        <AccordionDetails>
                            <Row className="row1">
                                <Col className="d-flex align-items-center">
                                    <p>Localidad:</p>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <p>{visit.location_name}</p>
                                </Col>
                            </Row>
                            <Row className="row2 d-flex align-items-center ">
                                <Col className="d-flex align-items-center">
                                    <p>Tiempo de viaje:</p>
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <p>{DurationToTime(visit.travel_time)}</p>
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
                                    <p>{visit.group_name}</p>
                                </Col>
                            </Row>

                            <Row className="row1">
                                <Col className="d-flex align-items-center">
                                    <p>Estado:</p>
                                    </Col>
                                    <Col className="d-flex align-items-center">
                                        <p>{visit.visit_status_name}</p>
                                    </Col>
                            </Row>
                            <Row className="ButtonEditVisit">
                                <Button variant="contained" className="Buttonedit">
                                    Editar Visita
                                </Button>
                            </Row>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Zoom>
        </Container>
    )
}
