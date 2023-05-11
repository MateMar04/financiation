import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/registrovisita.css"
import "primereact/resources/primereact.min.css";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

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

    return (
        <Container fluid>
            <Container>
                <row classname=" " id="Rowcontent">
                    <container>
                        <h2 id="tittle">Registro de Visitas</h2>
                    </container>
                    <container id="containerregi">
                        <Form.Control id="input2" as="select"><option value="">Selecciona una localidad</option>{localidades.map((localidad, index) =>
                            (<option key={index} value={localidad}>{localidad}</option>))}</Form.Control>
                        <Form.Control id="input2" as="select"> {areasDeTrabajo.map((area, index) => (<option key={index}>{area}</option>))}</Form.Control>
                        <Form.Control type="date" id="inputdate" name="dob" placeholder="Fecha" />
                    </container>
                    <container id="containerregi">
                        <input type="text" id="inpu1" placeholder="Nombre" />
                        <input type="text" id="inpu2" placeholder="Cargo" />
                        <Form.Control id="inputnum" type="tel" placeholder="Numero" />
                    </container>
                    <container id="containerregi">
                        <Form.Control id="inp1" type="time" />
                        <input type="text" id="inp2" placeholder="Lugar" />
                        <Button id="bt1" variant="primary">Registar</Button>{' '}
                    </container>
                </row>
            </Container>
        </Container>

    )
}






