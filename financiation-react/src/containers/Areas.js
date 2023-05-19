import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export function Rentas(){

    const selectStyle = {
        padding: '15px',
    };
    return(
        <Container>
          <h3>Rentas Córdoba</h3>


            <div className="py-3">
            <Row className="justify-content-center align-items-center">
                <Col md={8}>
            <FloatingLabel controlId="floatingTextarea2" label="Consulta del cliente">
                <Form.Control
                    as="textarea"
                    placeholder="Consulta del cliente"
                    style={{ height: '100px'}}
                />
            </FloatingLabel>
                </Col>
            </Row>
            </div>

                <Row className="justify-content-center align-items-center">
                    <Col xs={5} md={8}>
                    <Button variant="secondary" size="sm">Enviar Consulta</Button>
                    </Col>
                    <Col>
                    <Button variant="secondary" size="sm">Enviar consulta a otro referente</Button>
                    </Col>
                </Row>
        </Container>
    );
}


export function Caja_de_Jubilados(){
    return(
        <div>
            <h1>Caja_de_Jubilados</h1>
        </div>
    );
}


export function IPJ(){
    return(
        <div>
            <h1>IPJ</h1>
        </div>
    );
}


export function Registro_Civil(){
    return(
        <div>
            <h1>Registro_Civil</h1>
        </div>
    );
}


export function Registro_Propiedad(){
    return(
        <div>
            <h1>Registro_Propiedad</h1>
        </div>
    );
}


export function Catastro(){
    return(
        <div>
            <h1>Catastro</h1>
        </div>
    );
}


export function Inteligencia_Fiscal(){
    return(
        <div>
            <h1>Inteligencia_Fiscal</h1>
        </div>
    );
}


export function Ropyce(){
    return(
        <div>
            <h1>Ropyce</h1>
        </div>
    );
}
