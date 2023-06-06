import React from 'react';
import {FloatingLabel, Container, Row, Col, Form} from 'react-bootstrap';


export function Rentas() {
    const selectStyle = {
        padding: '15px',
    };
    return (
        <Container>
            <Row>
                <h3>El ciudadano consulta por</h3>
            </Row>
            <Container>
                <div className='py-3'>
                    <Row>

                        <Col>
                            <Form.Check aria-label="option 1" label={`Impresión Cedulón 2023`} className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Consulta y regularización de deuda`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Adhesión a débito automático`}
                                        className='formschecks'/>
                        </Col>
                        <Col>
                            <Form.Check aria-label="option 1" label={`Asesoramiento de gestiones online`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Pago online con tarjetas de débito y crédito`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={'Consulta de exenciones impositivas'}
                                        className='formschecks'/>
                        </Col>
                    </Row>
                    <div className='py-3'>
                        <Row className="justify-content-center align-items-center">
                            <Col md={8}>
                                <FloatingLabel controlId="floatingTextarea2" label="Otros">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Consulta del cliente"
                                        style={{height: '100px'}}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </Container>
    );
}

export function Registro_Civil() {
    return (
        <Container>
            <Row>
                <h3>El ciudadano consulta por</h3>
            </Row>
            <Container>
                <div className='py-3'>
                    <Row>
                        <Col>
                            <Form.Check aria-label="option 1" label={`Asesoramiento en gestiones online`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Trámite de DNI y Pasaporte`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1"
                                        label={`Inicio de trámite de partidas de nacimiento y matrimonio`}
                                        className='formschecks'/>
                        </Col>
                    </Row>

                    <div className='py-3'>
                        <Row className="justify-content-center align-items-center">
                            <Col md={8}>
                                <FloatingLabel controlId="floatingTextarea2" label="Otros">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Consulta del cliente"
                                        style={{height: '100px'}}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>
        </Container>

    );
}

export function Catastro() {
    return (
        <Container>
            <Row>
                <h3>El ciudadano consulta por</h3>
            </Row>
            <Container>
                <div className='py-3'>
                    <Row>
                        <Col>
                            <Form.Check aria-label="option 1" label={`Asesoramiento de gestiones online`}
                                        className='formschecks'/>
                        </Col>
                    </Row>

                    <div className='py-3'>
                        <Row className="justify-content-center align-items-center">
                            <Col md={8}>
                                <FloatingLabel controlId="floatingTextarea2" label="Otros">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Otros"
                                        style={{height: '100px'}}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>
        </Container>
    );
}

export function Caja_de_Jubilados() {
    return (
        <Container>
            <Row>
                <h3>El ciudadano consulta por</h3>
            </Row>
            <Container>
                <div className='py-3'>
                    <Row>
                        <Col>
                            <Form.Check aria-label="option 1" label={`Asesoramiento de gestiones online`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Jubilaciones o pensiones`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Futuros beneficiarios`} className='formschecks'/>
                            <Form.Check aria-label="option 1" label={'Subsidios por fallecimiento o seguros'}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Historia Laboral`} className='formschecks'/>
                        </Col>
                    </Row>

                    <div className='py-3'>
                        <Row className="justify-content-center align-items-center">
                            <Col md={8}>
                                <FloatingLabel controlId="floatingTextarea2" label="Otros">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Otros"
                                        style={{height: '100px'}}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>
        </Container>
    );
}

export function CiDi() {
    return (

        <Container>
            <Row>
                <h3>El ciudadano consulta por</h3>
            </Row>
            <Container>
                <div className='py-3'>
                    <Row>
                        <Col>
                            <Form.Check aria-label="option 1" label={`Creación de cuentas de Ciudadano Digital Nivel 2`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Recuperación de cuentas`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Actualización de mails`} className='formschecks'/>

                        </Col>
                    </Row>

                    <div className='py-3'>
                        <Row className="justify-content-center align-items-center">
                            <Col md={8}>
                                <FloatingLabel controlId="floatingTextarea2" label="Otros">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Otros"
                                        style={{height: '100px'}}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>
        </Container>
    );
}

export function IPJ() {
    return (
        <Container>
            <Row>
                <h3>El ciudadano consulta por</h3>
            </Row>
            <Container>
                <div className='py-3'>
                    <Row>
                        <Col>
                            <Form.Check aria-label="option 1" label={`Asesoramiento de gestiones online`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Sociedades, Asociaciones Civiles y Fundaciones.`}
                                        className='formschecks'/>
                        </Col>
                    </Row>

                    <div className='py-3'>
                        <Row className="justify-content-center align-items-center">
                            <Col md={8}>
                                <FloatingLabel controlId="floatingTextarea2" label="Otros">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Otros"
                                        style={{height: '100px'}}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>
        </Container>
    );
}


export function Registro_Propiedad() {
    return (
        <Container>
            <Row>
                <h3>El ciudadano consulta por</h3>
            </Row>
            <Container>
                <div className='py-3'>
                    <Row>
                        <Col>
                            <Form.Check aria-label="option 1" label={`Inscripción de vivienda como Bien de Familia`}
                                        className='formschecks'/>
                            <Form.Check aria-label="option 1" label={`Asesoramiento en gestiones online`}
                                        className='formschecks'/>
                        </Col>
                    </Row>

                    <div className='py-3'>
                        <Row className="justify-content-center align-items-center">
                            <Col md={8}>
                                <FloatingLabel controlId="floatingTextarea2" label="Otros">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Otros"
                                        style={{height: '100px'}}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>
        </Container>
    );
}

export function Otros() {
    return (
        <div className='py-3'>
            <Row className="justify-content-center align-items-center">
                <Col md={8}>
                    <FloatingLabel controlId="floatingTextarea2" label="Otros">
                        <Form.Control
                            as="textarea"
                            placeholder="Otros"
                            style={{height: '100px'}}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
        </div>
    );
}
