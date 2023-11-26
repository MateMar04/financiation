import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Logo from "../assets/images/PRUEBA.PNG";
import { Modal } from 'antd';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import LoadingModal from "../components/LoadingModal";

const ResetPasswordPage = () => {
    const history = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showloading, setShowloading] = useState(false);

    const resetPasswordEmail = async (e) => {
        e.preventDefault();
        setShowloading(true);
        try {
            const response = await fetch('/auth/users/reset_password/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "email": e.target.email.value
                })
            });

            if (response.status === 204) {
                message.success('Se ha enviado el correo correctamente');
            } else {
                message.error('No se puedo enviar el correo');
            }
        } finally {
            setShowloading(false);
        }

    }

    return (

        <Container fluid className="fondo">
             <LoadingModal message="Cargando" show={showloading} />
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
                <Form onSubmit={resetPasswordEmail}>
                    <Row className={'justify-content-center text-center'}>
                        <Form.Group>
                            <TextField
                                label="Correo Electrónico"
                                variant="outlined"
                                name="email"
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
                        <Button type="submit" className="BtnEnviarResetPassword">Enviar</Button>
                    </Row>
                </Form>
            </Container>

        </Container>
    );
}

export default ResetPasswordPage
