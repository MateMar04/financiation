import React, {useContext} from "react";
import '../assets/styles/LoginPage.css'
import Logo from "../assets/images/PRUEBA.PNG";
import {Button, Row, Container, Form, FloatingLabel} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthContext  from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (


        <Container className="ContainerLoginPage">

            <Row className={'justify-content-center text-center'}>
                <img src={Logo} className="ImgLogoLogin" alt="Logo del ministerio de finanzas"/>
            </Row>

            <Row className={'justify-content-center text-center'}>
                <h3 className={'h3LoginPage'}>Iniciar Sesion</h3>
            </Row>

            <Form onSubmit={loginUser}>

                <Row className={'justify-content-center text-center'}>
                    <Form.Group>
                        <TextField
                            label="CUIL"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"> <AccountCircleOutlinedIcon/> </InputAdornment>),
                                sx: {borderRadius: 6, borderColor: '#f4f4f4'}
                            }}
                            type="text"
                            name='ssn'
                            required
                            className={'InputLoginPage'}
                        />
                    </Form.Group>
                </Row>

                <Row className={'justify-content-center text-center py-4'}>
                    <Form.Group>
                        <TextField label="Contraseña" variant="outlined" InputProps={{
                            startAdornment: (<InputAdornment position="start"> <VpnKeyOutlinedIcon/> </InputAdornment>),
                            sx: {borderRadius: 6, borderColor: '#f4f4f4'}
                        }} type="password" name="password" required className={'InputLoginPage'}/>
                    </Form.Group>
                </Row>

                <Row className={'justify-content-center text-center'}>
                    <Button type="submit" className="BtnIniciarSesionLogin">Iniciar Sesion</Button>
                </Row>
            </Form>

            <Row className={'justify-content-center text-center'}>
                <Link to="/reset-password/">
                    <p className={'pLoginPage'}>Olvidé mi contraseña</p>
                </Link>
            </Row>
            <Row className={'justify-content-center text-center'}>
                <Link to="/signin/">
                    <p className={'SecondpLoginPage'}>Crea una cuenta</p>
                </Link>
            </Row>


        </Container>

    )
};

export default LoginPage;


