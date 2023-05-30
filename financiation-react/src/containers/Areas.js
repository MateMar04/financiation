import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export function Rentas(){

    const selectStyle = {
        padding: '15px',
    };
    return(
        <Container>
            <Row>
                <h3>El cliente pregunta por</h3>
            </Row>
            <Container>
            <div className='py-3'>
            <Row>

                <Col>
                    <Form.Check aria-label="option 1" label={`Impresión Cedulón 2023`} className='formschecks'/>
                    <Form.Check aria-label="option 1" label={`Consulta y regularización de deuda`} className='formschecks'/>
                    <Form.Check aria-label="option 1" label={`Adhesión a débito automático`} className='formschecks'/>
                </Col>
                <Col>
                    <Form.Check aria-label="option 1" label={`Asesoramiento de gestiones online`} className='formschecks'/>
                    <Form.Check aria-label="option 1" label={`Pago online con tarjetas de débito y crédito`} className='formschecks'/>
                    <Form.Check aria-label="option 1" label={'Consulta de exenciones impositivas'} className='formschecks'/>
                </Col>
            </Row>
                <div className='py-3'>
                <Row className="justify-content-center align-items-center">
                    <Col md={8}>
                    <FloatingLabel controlId="floatingTextarea2" label="Otros">
                        <Form.Control
                            as="textarea"
                            placeholder="Consulta del cliente"
                            style={{ height: '100px'}}
                        />
                    </FloatingLabel>
                    </Col>
                </Row>
                </div>
            </div>
            <div className='py-3'>
                <Row className="justify-content-center align-items-center">
                    <Col xs={3} md={2}>
                    <Button variant="secondary" size="sm">Enviar Consulta</Button>
                    </Col>

                </Row>
            </div>
            </Container>
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
