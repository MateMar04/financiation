import React, {useContext, useState} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import ImageIcon from '@mui/icons-material/Image';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import TourIcon from '@mui/icons-material/Tour';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DirectionsIcon from '@mui/icons-material/Directions';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import SucceedModal from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"

const AddVisitPage = () => {

    let {authTokens} = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    let postVisit = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/visit/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "flyer": e.target.flyer.value,
                "distance": e.target.distance.value,
                "travel_time": e.target.travel_time.value,
                "visit_date": e.target.visit_date.value,
                "civil_registration": e.target.civil_registration.value,
                "accommodation": e.target.accommodation.value,
                "modernization_fund": e.target.modernization_fund.value,
                "start_time": e.target.start_time.value,
                "finish_time": e.target.finish_time.value,
                "place_name": e.target.place_name.value,
                "id_locality": e.target.id_locality.value,
                "id_group": e.target.id_group.value,
                "id_visit_status": e.target.id_visit_status.value,
                "id_agreement": e.target.id_agreement.value,
                "id_contacted_referrer": e.target.id_contacted_referrer.value,
                "id_address": e.target.id_address.value,
                "id_logo": e.target.id_logo.value
            })
        })
        if (response.status === 200) {
            toggleModalsucceed(); 
            await postVisit()
            //alert('se registro la visita correctamente')
        } else if(response.status == 500){
            toggleModalfailed(); 
            await postVisit()
            //alert('no se a registrado la visita (Uno de los datos ingresados no coincide con la base de datos)')
        } else if(response.status == 401){
            toggleModalfailed(); 
            await postVisit()
            //alert('no se a registrado la visita (Desautorizado)')
        } else if(response.status == 400){
            toggleModalfailed(); 
            await postVisit()
            //alert('no se a registrado la visita (Bad request)')
        }
    }

    return (
        <Container className="scrolling">
            <SucceedModal message="la visita" show ={showsuccess}/>
            <FailedModal message="la visita" show ={showfail}/>
            <Form onSubmit={postVisit}>
                <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                    <Form.Group>
                        <Container>
                            <Row className='justify-content-center'>
                                <Col className='justify-content-center'>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <ImageIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Inserte el ID del Flyer" variant="standard"
                                                   name="flyer"
                                                   type="number" required/>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>

                                        <BrandingWatermarkIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="ID del logo" variant="standard"
                                                   name="id_logo"
                                                   type="text" required/>
                                    </Box>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                        <Container>
                            <Row>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <DriveEtaIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Distancia int" variant="standard"
                                                   name="distance" type="number" required/>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <QueryBuilderIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Tiempo de viaje int" variant="standard"
                                                   name="travel_time" type="number" required/>
                                    </Box>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                        <Container>
                            <Row>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <CalendarMonthIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Fecha de visita YYYY-MM-DD"
                                                   variant="standard"
                                                   name="visit_date" type="text" required/>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <AssignmentIndIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Registro Civil int" variant="standard"
                                                   name="civil_registration" type="text" required/>
                                    </Box>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                        <Container>
                            <Row>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <HotelIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Introducir hospedaje int"
                                                   variant="standard"
                                                   name="accommodation" type="text" required/>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <LocalAtmIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Fondo de modernizacion int"
                                                   variant="standard"
                                                   name="modernization_fund" type="text" required/>
                                    </Box>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                        <Container>
                            <Row>
                                <Col>
                                    <a>Hora de inicio de la jornada</a>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>

                                        <HourglassBottomIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Hora YYYY-MM-DD"
                                                   variant="standard" name="start_time" type="text" required/>
                                    </Box>
                                </Col>
                                <Col>
                                    <a>Hora de fin de la jornada</a>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>

                                        <HourglassBottomIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Hora YYYY-MM-DD"
                                                   variant="standard" name="finish_time" type="text" required/>
                                    </Box>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                        <Container>
                            <Row>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>

                                        <HourglassBottomIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="Nombre del lugar txt" variant="standard"
                                                   name="place_name" type="text" required/>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>

                                        <LocationOnIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="ID de la Localidad" variant="standard"
                                                   name="id_locality" type="text" required/>
                                    </Box>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                        <Container>
                            <Row>
                                <Col>


                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>

                                        <GroupIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="ID del grupo" variant="standard"
                                                   name="id_group"
                                                   type="text" required/>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <TourIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="ID del Estado de visita" variant="standard"
                                                   name="id_visit_status" type="text" required/>
                                    </Box>
                                </Col>
                            </Row>

                        </Container>
                        <hr/>
                        <Container>
                            <Row>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                        <HandshakeIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="ID del acuerdo" variant="standard"
                                                   name="id_agreement"
                                                   type="text" required/>
                                    </Box>
                                </Col>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>

                                        <DirectionsIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="ID de la Direccion" variant="standard"
                                                   name="id_address" type="text" required/>
                                    </Box>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                        <Container>
                            <Row>
                                <Col>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>

                                        <ContactMailIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        <TextField id="input-with-sx" label="ID del contacto del referido"
                                                   variant="standard"
                                                   name="id_contacted_referrer" type="text" required/>
                                    </Box>
                                </Col>
                            </Row>
                        </Container>
                        <hr/>
                    </Form.Group>
                </Box>
                <Container>
                    <Container>
                        <Row className='justify-content-center'>
                            <Col md={2} xs={4}>
                                <Form.Group>
                                    <Button type="submit" size="medium" variant="outline-primary">Añadir
                                        Visita</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Form>
        </Container>
    )
        ;

};
export default AddVisitPage;