import { Col, Container, Row } from "react-bootstrap";
import "../assets/styles/VisitCard.css"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Zoom } from "@mui/material";
import Button from '@mui/material/Button';
import AuthContext from "../context/AuthContext";
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import {message, Popconfirm } from 'antd';

export const VisitCard = ({visit, onDeleteSuccess}) => {
    let { authTokens } = useContext(AuthContext);
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const [accordionExpanded, setAccordionExpanded] = useState(false);

    const cancel = (e) => {
        message.error('Se ha cancelado la eliminación');
    };

    let deleteVisit = async (id) => {
        let response = await fetch(`/api/visits/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
        });
        if (response.status === 200) {
            onDeleteSuccess();
            setAccordionExpanded(false);
            message.success('Se ha borrado la visita exitosamente');
        } else {
            console.error("No se ha podido borrar la visita");
        }
    }

    const handleAccordionChange = (event, isExpanded) => {
        setAccordionExpanded(isExpanded);
    };

    useEffect(() => {
        setAccordionExpanded(false);
    }, []);
    return (

        <Container className='CompletlyContainer'>
            <SucceedModal onClose={() => toggleModalsucceed()} message="la visita" show={showsuccess} />
            <FailedModal onClose={() => toggleModalfailed()} message="la visita" show={showfail} />
            <Zoom in>
                <div>
                    <Accordion className={'accordion-visits'} expanded={accordionExpanded} onChange={handleAccordionChange}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon fontSize="large" className="IconDropdownVisitCard" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="AccordionSummary"
                        >
                            <Col xs={7}>
                                <Typography sx={{ width: '70%' }} className="text-start"><h6>
                                    {visit.name}</h6>
                                </Typography>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <Typography sx={{ color: 'text.secondary' }}
                                    className=" d-flex align-items-center">{visit.visit_status_name}</Typography>
                            </Col>
                            <Col xs={1} className="d-flex align-items-center">
                                {visit.visit_status_name === 'Finalizada' && (
                                    <Typography sx={{ color: 'text.secondary' }}><a
                                        className="d-flex align-items-center statusName circle_green text-end "></a></Typography>
                                )}

                                {visit.visit_status_name === 'No Confirmada' && (
                                    <Typography sx={{ color: 'text.secondary' }}><a
                                        className="d-flex align-items-center statusName circle_red text-end "></a></Typography>
                                )}
                                {visit.visit_status_name === 'Pendiente' && (
                                    <Typography sx={{ color: 'text.secondary' }}><a
                                        className="d-flex align-items-center statusName circle_red text-end "></a></Typography>
                                )}

                                {visit.visit_status_name === 'En proceso' && (
                                    <Typography sx={{ color: 'text.secondary' }}><a
                                        className="d-flex align-items-center statusName circle_orange text-end "></a></Typography>
                                )}

                            </Col>


                        </AccordionSummary>

                        <AccordionDetails>
                            <Row className="row1">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Localidad:</p>
                                </Col>
                                <Col >
                                    <p>{visit.location_name}</p>
                                </Col>
                            </Row>
                            <Row className="row2 d-flex align-items-center ">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Tiempo de viaje:</p>
                                </Col>
                                <Col >
                                    <p>{visit.travel_time} min</p>
                                </Col>
                            </Row>
                            <Row className="row1">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Distancia:</p>
                                </Col>
                                <Col >
                                    <p>{visit.distance} Km</p>
                                </Col>
                            </Row>
                            <Row className="row2">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Fecha de la visita:</p>
                                </Col>
                                <Col >
                                    <p>{visit.visit_date}</p>
                                </Col>
                            </Row>
                            <Row className="row1">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Nombre del lugar:</p>
                                </Col>
                                <Col >
                                    <p>{visit.place_name}</p>
                                </Col>
                            </Row>

                            <Row className="row2">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Grupo:</p>
                                </Col>
                                <Col >
                                    <p>{visit.group_name}</p>
                                </Col>
                            </Row>

                            <Row className="row1">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Estado:</p>
                                </Col>
                                <Col >
                                    <p>{visit.visit_status_name}</p>
                                </Col>
                            </Row>
                             <Row className="row2">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Referente contactado:</p>
                                </Col>
                                <Col >
                                    <p>{visit.contacted_referrer_name}</p>
                                </Col>
                            </Row>
                            <Row className="row1">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Partido politico:</p>
                                </Col>
                                <Col >
                                    <p>{visit.politic_party_name}</p>
                                </Col>
                            </Row>
                             <Row className="row2">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Intendente:</p>
                                </Col>
                                <Col >
                                    <p>{visit.mayor_name}</p>
                                </Col>
                            </Row>
                             <Row className="row1">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Hora de inicio:</p>
                                </Col>
                                <Col>
                                    <p>{visit.start_time}</p>
                                </Col>
                            </Row>
                            <Row className="row2">
                                <Col className="text-md-start text-sm-center" xs={12} md={6}>
                                    <p>Hora de fin:</p>
                                </Col>
                                <Col>
                                    <p>{visit.finish_time}</p>
                                </Col>
                            </Row>
                            <Row className="ButtonEditVisit">
                                <Col>
                                    <Link to={`/visits/edit/${visit.id}`} state={{ visitData: visit.id }}>

                                        <Button variant="contained" className="Buttonedit">
                                            Editar Visita
                                        </Button>

                                    </Link>
                                </Col>
                                <Col>
                                    <Popconfirm
                                        title="Eliminar la visita"
                                        description="Esta seguro de que quiere eliminarla?"
                                        onConfirm={()=>deleteVisit(visit.id)}
                                        onCancel={cancel}
                                        okText="Si"
                                        cancelText="No">
                                            <Button variant="contained" className="Buttondelete">
                                                Eliminar Visita
                                            </Button>
                                    </Popconfirm>
                                </Col>
                            </Row>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Zoom>
        </Container>
    )
}
