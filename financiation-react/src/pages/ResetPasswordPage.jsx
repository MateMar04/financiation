import React from "react";
import {Card, Col, Container, FloatingLabel, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const ResetPasswordPage = () => {
    return (
        <Container>
            <Form>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md='6'>
                            <Card>
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
                                        <button className='btn btn-primary' type='submit'>Enviar</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </Container>
    );
}

export default ResetPasswordPage
