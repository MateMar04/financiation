import React from "react";
import keyy from "../assets/images/keyy.gif";
import {Card, Container, FloatingLabel, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

const ResetPasswordConfirmPage = () => {

    const {uid, token} = useParams()
    let history = useNavigate()

    let uidToken = uid
    let activationToken = token


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
            history('/')
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
        </Container>


    )
        ;
}

export default ResetPasswordConfirmPage