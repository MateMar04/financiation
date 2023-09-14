
import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import Logo from "../assets/images/PRUEBA.PNG";

import { Link, useNavigate } from "react-router-dom";
import '../assets/styles/ResetPassword.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Modal } from 'antd';

const ResetPasswordPage = () => {

    let history = useNavigate()
    const [show, setShow] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showModal = () => {
       
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
            <Container className="ContainerResetPassword">

                <Row className={'justify-content-center text-center'}>
                    <img src={Logo} className="ImgLogoResetPassword" alt="Logo del ministerio de finanzas" />
                </Row>
                <Row className={'justify-content-center text-center'}>
                    <h3 className={'h3ResetPasswordPage'}>Reestablece tu contraseña</h3>
                </Row>
                <Row className={'justify-content-center text-center'}>
                    <p className={'pResetPassword'}>¿No recuerdas tu contraseña? Introduce tu correo electrónico para cambiarla.</p>

                </Row>
                <Form>
                    <Row className={'justify-content-center text-center'}>
                        <Form.Group>
                            <TextField
                                label="Correo Electrónico"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"> <MailOutlineIcon /> </InputAdornment>),
                                    sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                                }}
                                type="text"
                                required
                                className={'InputResetPassword'}
                            />
                        </Form.Group>
                    </Row>

                    <Row className={'justify-content-center text-center'}>
                        <Button type="submit" className="BtnEnviarResetPassword" onClick={showModal}>Enviar</Button>
                    </Row>
                </Form>
                <Modal title="Activación de cuenta" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <p>Se ha enviado el mail</p>
                </Modal>
            </Container>

        </Container>
    );
}

export default ResetPasswordPage
