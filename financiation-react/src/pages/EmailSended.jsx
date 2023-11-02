
import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import Logo from "../assets/images/PRUEBA.PNG";

import { Link, useNavigate } from "react-router-dom";
import '../assets/styles/ResetPassword.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Modal } from 'antd';

export const EmailSended = () => {

    return (

        <Container fluid className="fondo">
            <Container className="ContainerResetPassword">

                <Row className={'justify-content-center text-center'}>
                    <img src={Logo} className="ImgLogoResetPassword" alt="Logo del ministerio de finanzas" />
                </Row>
                <Row className={'justify-content-center text-center'}>
                    <h3 className={'h3ResetPasswordPage'}>El e-mail de confirmación de su cuenta ha sido enviado al referente.</h3>
                </Row>
                <Row className={'justify-content-center text-center'}>

                    <p className={'pResetPassword'}>El correo de confirmación de cuenta ha sido enviado al referente para su revisión. Por favor, mantente en contacto con el referente para obtener más información y para completar el proceso de creación de cuenta.</p>
                    <p className={'pResetPassword'}>Podrás usar el sistema una vez que el correo electrónico haya sido aprobado.</p>

                </Row>


            </Container>

        </Container>
    );
}
