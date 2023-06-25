import React from "react";
import {Button, Card, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const ResetPasswordPage = () => {

    let history = useNavigate()

    let resetPasswordEmail = async (e) => {
        e.preventDefault()
        let response = await fetch('/auth/users/reset_password/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "email": e.target.email.value
            })
        })
        if (response.status === 204) {
            history('/')
        } else {
            alert('Something went wrong')
        }
    }

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
                                <Form onSubmit={resetPasswordEmail}>
                                    <FloatingLabel className='floatingLabel' label="Correo electronico">
                                        <Form.Control className='form-control'
                                                      type='email'
                                                      placeholder='Email'
                                                      name='email'
                                                      required>
                                        </Form.Control>
                                    </FloatingLabel>
                                    <div className='py-3'>
                                        <Button className='btn btn-primary' type='submit'>Enviar</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default ResetPasswordPage
