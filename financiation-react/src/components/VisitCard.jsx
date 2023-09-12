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
            <Zoom in style={{ transitionDelay: '100ms' }}>
                <div>
                    <Accordion className={'accordion-visits'}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="AccordionSummary"

                        >
                            <Row>
                                    <h5 className="VisitName">{visit.name}</h5>
                                 
                            </Row>

                        </AccordionSummary>

                        <AccordionDetails>
                            <p>{visit.id_locality}</p>

                            <p>{visit.travel_time}</p>

                            <p>{visit.distance}</p>

                            <p>{visit.visit_date}</p>

                            <p>{visit.place_name}</p>

                            <h5>Grupo:</h5>

                            <p>{visit.id_group}</p>


                            <p>{visit.id_visit_status}</p>

                        </AccordionDetails>
                    </Accordion>
                </div>
            </Zoom>
        </Container >
    )
}
