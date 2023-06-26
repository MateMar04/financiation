import React, {useContext, useEffect, useState} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form, FloatingLabel, Row, Col} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import {useNavigate} from 'react-router-dom'

const AddVisitPage = () => {


    let {authTokens} = useContext(AuthContext)
    let history = useNavigate()

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
            history('/')
        } else {
            alert('Something went wrong')
        }
    }

    return (

        <Container className="scrolling">
            <h3>Añadir Visita</h3>
            <Form onSubmit={postVisit}>
                <Form.Group>
                    <Container>
                    <FloatingLabel label='Inserte el ID del Flyer'>
                        <Form.Control
                            type="number"
                            placeholder="Enter Flyer"
                            name="flyer"
                        />
                    </FloatingLabel>
        </Container>
    <Container>
        <FloatingLabel label='Distancia int'>
        <Form.Control
            type="text"
            placeholder="Enter Distance"
            name="distance"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='Tiempo de viaje int'>
        <Form.Control
            type="text"
            placeholder="Enter Travel Time"
            name="travel_time"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='Fecha de visita YYYY-MM-DD'>
        <Form.Control
            type="text"
            placeholder="Enter visit date"
            name="visit_date"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='Insertar Registro Civil int'>
        <Form.Control
            type="text"
            placeholder="Enter registro civil"
            name="civil_registration"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='Introducir hospedaje int'>
        <Form.Control
            type="text"
            placeholder="Enter accommodation"
            name="accommodation"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='Fondo de modernizacion int'>
        <Form.Control
            type="text"
            placeholder="Enter modernization fund"
            name="modernization_fund"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='Hora de inicio de la jornada YYYY-MM-DD'>
        <Form.Control
            type="text"
            placeholder="Enter start time"
            name="start_time"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='Hora de fin de la jornada YYYY-MM-DD'>
        <Form.Control
            type="text"
            placeholder="Enter finish time"
            name="finish_time"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='Nombre del lugar txt'>
        <Form.Control
            type="text"
            placeholder="Enter place_name"
            name="place_name"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='ID de la Localidad'>
        <Form.Control
            type="text"
            placeholder="Enter id_locality"
            name="id_locality"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='ID del grupo'>
        <Form.Control
            type="text"
            placeholder="Enter id_group"
            name="id_group"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='ID del Estado de visita'>
        <Form.Control
            type="text"
            placeholder="Enter id_visit_status"
            name="id_visit_status"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='ID del acuerdo'>
        <Form.Control
            type="text"
            placeholder="Enter id_agreement"
            name="id_agreement"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='ID del contacto del referido'>
        <Form.Control
            type="text"
            placeholder="Enter id_contacted_referrer"
            name="id_contacted_referrer"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='ID de la Direccion'>
        <Form.Control
            type="text"
            placeholder="Enter id_address"
            name="id_address"
        />
        </FloatingLabel>
    </Container>
    <Container>
        <FloatingLabel label='ID del logo'>
        <Form.Control
            type="text"
            placeholder="Enter id_logo"
            name="id_logo"
        />
        </FloatingLabel>
    </Container>
</Form.Group>
    <Container>
        <Container>
            <Row className='justify-content-center'>
                <Col md={2} xs={4}>
        <Form.Group>
            <Button type="submit" variant="outline-primary">Añadir Visita</Button>
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