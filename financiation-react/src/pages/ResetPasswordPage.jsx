import React from "react";
import {Button, Card, Col, Container, FloatingLabel , Row} from "react-bootstrap";

const ResetPasswordPage = () => {
    return (

        <Container fluid className="fondo">
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <Card id="carta">
                                <Card.Header as="h5">Restablecer su contraseña</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el
                                        acceso a tu cuenta.
                                    </Card.Text>
                                    <FloatingLabel className='floatingLabel' label="Correo electronico">
                                        <input
                                            className='form-control'
                                            type='email'
                                            placeholder='Email'
                                            name='email'
                                            required
                                        />
                                    </FloatingLabel>
                                    <div className='py-3'>
                                        <Button className='btn btn-primary' type='submit'>Enviar</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
    </Container>
    );
}

export default ResetPasswordPage
