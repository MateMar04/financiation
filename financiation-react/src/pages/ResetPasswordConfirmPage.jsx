import React from "react";
import keyy from "../assets/images/keyy.gif";
import {Button, Card, Col, Container, FloatingLabel, Form, Modal, Row} from "react-bootstrap";
import Check from "../assets/images/checked.gif";
import {Link, useNavigate, useParams} from "react-router-dom";

const ResetPasswordConfirmPage = () => {

    const {uid, token} = useParams()
    let history = useNavigate()

    let uidToken = uid
    let activationToken = token
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let resetPasswordConfirm = async (e) => {
        e.preventDefault()
        let response = await fetch('/auth/users/reset_password_confirm/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "uid": uidToken,
                "token": activationToken,
                "new_password": e.target.new_password.value,
                "re_new_password": e.target.re_new_password.value
            })
        })
        if (response.status === 204) {
            handleShow()
            await resetPasswordConfirm()
        } else {
            alert('Something went wrong')
        }
    }

    return (
        <Container fluid className='fondo'>
            <Container>
                <Card id='carta'>
                    <Card.Body>
                        <img src={keyy} alt="" className='imgLogo'/>

                        <Form onSubmit={resetPasswordConfirm}>
                            <div className='py-2'>
                                <FloatingLabel controlId="floatingTextarea2"
                                               label="Introduzca su nueva contraseña">

                                    <Form.Control className='form-control'
                                                  type='password'
                                                  placeholder='Confirm New Password'
                                                  name='new_password'
                                                  minLength='6'
                                                  required>

                                    </Form.Control>
                                </FloatingLabel>
                            </div>
                            <div className='py-2'>
                                <FloatingLabel controlId="floatingTextarea2" label="Repita su nueva contraseña">
                                    <Form.Control className='form-control'
                                                  type='password'
                                                  placeholder='Repita la contraseña'
                                                  name='re_new_password'
                                                  minLength='6'
                                                  required>
                                    </Form.Control>
                                </FloatingLabel>
                            </div>
                            <div className='py-2'>
                                <button className='btn btn-primary' type='submit'>Cambiar Contraseña</button>
                            </div>

                        </Form>


                    </Card.Body>
                </Card>

            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Container className='justify-content-center'>
                        <Row className='justify-content-center'>
                            <Col md={5}>
                                <img src={Check} alt="CheckButton" className="mx-auto img-fluid"/>
                                <p className="text-center">¡Se a cambiado la contraseña correctamente!</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={'/login'}>
                        <Button variant="success">
                            OK
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </Container>


    )
        ;
}

export default ResetPasswordConfirmPage