import React, {useContext, useState} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import TextField from '@mui/material/TextField';

import DriveEtaIcon from '@mui/icons-material/DriveEta';
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
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import Card from '@mui/material/Card';
import Select from "@mui/material/Select";
import {CardContent} from "@mui/material";


const AddVisitPage = () => {

    let {authTokens} = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    let postVisit = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/visits', {
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
        } else if (response.status === 500) {
            toggleModalfailed();
            await postVisit()
            //alert('no se a registrado la visita (Uno de los datos ingresados no coincide con la base de datos)')
        } else if (response.status === 401) {
            toggleModalfailed();
            await postVisit()
            //alert('no se a registrado la visita (Desautorizado)')
        } else if (response.status === 400) {
            toggleModalfailed();
            await postVisit()
            //alert('no se a registrado la visita (Bad request)')
        }
    }


    const renderIconAndInput = (IconComponent, label, name, type, required) => (
        <Card sx={{maxWidth: 200}}>
            <Container>
                <Row className="justify-content-center">
                    <IconComponent sx={{ fontSize: 65 }} />
                </Row>
                <Row>
                    {type === 'select' ? (
                        <Select
                            id={`input-${name}`}
                            label={label}
                            variant="standard"
                            name={name}
                            required={required}
                        />
                    ) : (
                        <TextField
                            id={`input-${name}`}
                            label={label}
                            variant="standard"
                            name={name}
                            type={type}
                            required={required}
                        />
                    )}
                </Row>
            </Container>
        </Card>
    );

    return (
        <Container className="scrolling">
            <SucceedModal message="la visita" show={showsuccess}/>
            <FailedModal message="la visita" show={showfail}/>
            <Form onSubmit={postVisit}>

                <Form.Group>
                    {renderIconAndInput(CalendarMonthIcon, 'Fecha de visita YYYY-MM-DD', 'visit_date', 'text', true)}
                    {renderIconAndInput(LocationOnIcon, 'Ciudad', 'id_locality', 'select', true)}
                    {renderIconAndInput(HourglassBottomIcon, 'Hora de inicio de la jornada', 'start_time', 'text', true)}
                    {renderIconAndInput(HourglassBottomIcon, 'Hora de fin de la jornada', 'finish_time', 'text', true)}
                    {renderIconAndInput(DriveEtaIcon, 'Distancia int', 'distance', 'number', true)}
                    {renderIconAndInput(QueryBuilderIcon, 'Tiempo de viaje int', 'travel_time', 'number', true)}
                    {renderIconAndInput(AssignmentIndIcon, 'Registro Civil int', 'civil_registration', 'text', true)}
                    {renderIconAndInput(HotelIcon, 'Introducir hospedaje int', 'accommodation', 'text', true)}
                    {/* Add more icon and input pairs here */}
                </Form.Group>

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
    );
};
export default AddVisitPage;