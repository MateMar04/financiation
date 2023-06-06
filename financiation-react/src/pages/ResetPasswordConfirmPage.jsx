import React from "react";
import keyy from "../assets/images/keyy.gif";
import {Card, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";

const ResetPasswordConfirmPage = () => {
    return (
        <div className='container mt-5'>
            <Form>
                <Container fluid>
                    <Row className='justify-content-center'>
                        <Col md='6'>
                            <Card>

                                <Card.Body>
                                    <img src={keyy} alt="" className='imgLogo'/>
                                    <div className='py-2'>
                                        <FloatingLabel controlId="floatingTextarea2"
                                                       label="Introduzca su nueva contraseña">
                                            <input
                                                className='form-control'
                                                type='password'
                                                placeholder='Confirm New Password'
                                                name='new_password'
                                                minLength='6'
                                                required
                                            />
                                        </FloatingLabel>
                                    </div>
                                    <div className='py-2'>
                                        <FloatingLabel controlId="floatingTextarea2" label="Repita su nueva contraseña">
                                            <input
                                                className='form-control'
                                                type='password'
                                                placeholder='Repita la contraseña'
                                                name='re_new_password'
                                                minLength='6'
                                                required
                                            />
                                        </FloatingLabel>
                                    </div>
                                    <div className='py-2'>
                                        <button className='btn btn-primary' type='submit'>Cambiar Contraseña</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>


            </Form>
        </div>
    );
}

export default ResetPasswordConfirmPage