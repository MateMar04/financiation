import React from "react";
import {Button, Card, Col, Container, FloatingLabel, Form, Modal, Row} from "react-bootstrap";
import Logo from "../assets/images/PRUEBA.PNG";
import Check from "../assets/images/checked.gif";
import {Link, useNavigate} from "react-router-dom";
import '../assets/styles/ResetPassword.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

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
             <Container className="ContainerResetPassword">

<Row className={'justify-content-center text-center'}>
    <img src={Logo} className="ImgLogoResetPassword" alt="Logo del ministerio de finanzas"/>
</Row>
<Row className={'justify-content-center text-center'}>
                <h3 className={'h3LoginPage'}>Reestablece tu contraseña</h3>
            </Row>
            <Row className={'justify-content-center text-center'}>
                <h6>Hola</h6>
            </Row>
            <Form>

                <Row className={'justify-content-center text-center'}>
                    <Form.Group>
                        <TextField
                            label="Email"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"> <MailOutlineIcon/> </InputAdornment>),
                                sx: {borderRadius: 6, borderColor: '#f4f4f4'}
                            }}
                            type="text"
                            name='ssn'
                            required
                            className={'InputResetPassword'}
                        />
                    </Form.Group>
                </Row>
                </Form>
            
        </Container>
        </Container>
    );
}

export default ResetPasswordPage
