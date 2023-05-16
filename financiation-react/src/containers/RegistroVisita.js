import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/registrovisita.css"
import "primereact/resources/primereact.min.css";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import { Form, Row } from 'react-bootstrap';

export default function RegistroVisita() {

    const areasDeTrabajo = [
        'Ventas',
        'Marketing',
        'Desarrollo',
        'Recursos Humanos',
        'Operaciones',
    ];

    const localidades = [
        'Ciudad A',
        'Ciudad B',
        'Ciudad C',
        'Ciudad D',
        'Ciudad E',
    ];

    const lugar = [
        'Ciudad A',
        'Ciudad B',
        'Ciudad C',
        'Ciudad D',
        'Ciudad E',
    ];



    return (
        <Container fluid>
            
                <Container id="Rowcontent">
                    <Container>
                        <Row>
                            <h2 id="tittle">Registro de Visitas</h2>
                        </Row>
                    </Container>
                    <Container>
                        <Row id="containerregi">
                            <Form.Control id="input" as="select"><option value="">Localidad</option>{localidades.map((localidad, index) =>
                                (<option key={index} value={localidad}>{localidad}</option>))}</Form.Control>
                            <Form.Control id="input" as="select"> {areasDeTrabajo.map((area, index) => (<option key={index}>{area}</option>))}</Form.Control>
                            <Form.Control type="date" id="inputdate" name="dob" placeholder="Fecha" />
                        </Row>
                    </Container>
                    <Container>
                        <Row id="containerregi">
                            <Form.Control id="input" type="text" placeholder="Nombre" />
                            <Form.Control id="input" type="text" placeholder="Cargo" />
                            <Form.Control id="inputnum" type="tel" placeholder="Numero" />
                        </Row>
                    </Container>
                    <Container>
                        <Row id="containerregi">
                            <Form.Control id="input" type="time" />
                            <Form.Control id="input" as="select"><option value="">Lugar</option>{lugar.map((lugar, index) =>
                                (<option key={index} value={lugar}>{lugar}</option>))}</Form.Control>
                            <Button id="bt1" variant="primary">Registar</Button>{' '}
                        </Row>
                    </Container>
                </Container>
            
        </Container>

    )
}






