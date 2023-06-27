import React from "react";
import {Button, Card, Col, Container, FloatingLabel, Form, Row, Modal} from "react-bootstrap";
import Check from "../assets/images/checked.gif";
import {useNavigate, Link} from "react-router-dom";

const ResetPasswordPage = () => {

    let history = useNavigate()
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            handleShow()
            await resetPasswordEmail()

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
            <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                        <Container className='justify-content-center'>
                            <Row className='justify-content-center'>
                                <Col md={5}>
                                    <img src={Check} alt="CheckButton" className="mx-auto img-fluid"/>
                                    <p className="text-center">¡Se a enviado una solicitud para restaurar su contraseña!</p>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={'/'}>
                            <Button variant="success">
                                OK
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
        </Container>
    );
}

export default ResetPasswordPage
