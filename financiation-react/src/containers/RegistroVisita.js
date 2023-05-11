import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/registrovisita.css"
import "primereact/resources/primereact.min.css";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

export default function RegistroVisita() {

    return (
        <Container fluid>
            <Container>
                <row classname=" " id="Rowcontent">
                    <container>
                        <h2 id="tittle">Registro de Visitas</h2>
                    </container>
                    <container id="containerregi">
                        <input type="text" id="input2" placeholder="Localidad" />
                        <Form.Control id="input2" as="textarea" rows={3} />
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






