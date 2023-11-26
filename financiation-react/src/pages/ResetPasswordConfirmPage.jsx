import React, { useContext, useState } from "react";
import '../assets/styles/ResetPasswordConfirm.css'
import { Button, Container, Form, Row } from "react-bootstrap";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/images/PRUEBA.PNG";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { message } from 'antd';
import LoadingModal from "../components/LoadingModal";

const ResetPasswordConfirmPage = () => {
    const { uid, token } = useParams();
    let history = useNavigate();

    let uidToken = uid;
    let activationToken = token;

    const [showloading, setShowloading] = useState(false);

    let resetPasswordConfirm = async (e) => {
        e.preventDefault();
        setShowloading(true);
    
        try {
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
            });
    
            if (response.status === 204) {
                message.success('Contraseña modificada correctamente');
                history('/'); 
            } else {
                message.error('La contraseña no se ha cambiado');
            }
        } finally {
            setShowloading(false);
        }
    }
    

    return (
        <Container className="ContainerResetPasswordConfirm">
            <LoadingModal message="Cargando" show={showloading} />

            <Row className={'justify-content-center text-center'}>
                <img src={Logo} className="ImgLogoResetPassword" alt="Logo del ministerio de finanzas" />
            </Row>

            <Row className={'justify-content-center text-center'}>
                <h3 className={'h3LoginPage'}>Reestablece tu constraseña</h3>
            </Row>

            <Form onSubmit={resetPasswordConfirm}>
                <Row className={'justify-content-center text-center'}>
                    <Form.Group>
                        <TextField
                            label="Nueva Contraseña"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment>),
                                sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                            }}
                            type="password"
                            name='new_password'
                            minLength='6'
                            required
                            className={'InputResetPasswordConfirm'}
                        />
                    </Form.Group>
                </Row>

                <Row className={'justify-content-center text-center py-4'}>
                    <Form.Group>
                        <TextField
                            label="Repita la contraseña"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment>),
                                sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                            }}
                            type="password"
                            name="re_new_password"
                            minLength='6'
                            required
                            className={'InputResetPasswordConfirm'}
                        />
                    </Form.Group>
                </Row>

                <Row className={'justify-content-center text-center'}>
                    <Button type="submit" className="BtnIniciarSesionLogin">Reestablecer</Button>
                </Row>
            </Form>
        </Container>
    );
}

export default ResetPasswordConfirmPage;
