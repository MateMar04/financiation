import React, {useContext} from "react";
import '../assets/styles/LoginPage.css'
import Logo from "../assets/images/PRUEBA.PNG";
import {Button, Row, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (

        <Container className="ContainerLoginPage">
            <Form onSubmit={loginUser}>
                <Row className={'justify-content-center text-center'}>
                    <img src={Logo} className="ImgLogoLogin" alt="Logo del ministerio de finanzas"/>
                </Row>
                <Row className={'justify-content-center text-center'}>
                    <h3 className={'h3LoginPage'}>Iniciar Sesion</h3>
                </Row>

                <Row className={'justify-content-center text-center'}>
                    <TextField
                        label="CUIL"
                        variant="outlined"
                        InputProps={{ startAdornment: (<InputAdornment position="start"> <AccountCircleOutlinedIcon/> </InputAdornment> ),sx: { borderRadius: 6 , borderColor: '#f4f4f4'} }}
                        type="number"
                        name='ssn'
                        required
                        className={'InputLoginPage'}
                    />
                </Row>
                <Row className={'justify-content-center text-center py-4'}>
                    <TextField label="Contraseña" variant="outlined" InputProps={{ startAdornment: (<InputAdornment position="start"> <VpnKeyOutlinedIcon/> </InputAdornment> ),sx: { borderRadius: 6 , borderColor: '#f4f4f4'} }} type="password" name="password" required className={'InputLoginPage'} />
                </Row>
                <Row className={'justify-content-center text-center'}>
                    <Button type="submit" className="BtnIniciarSesionLogin">Iniciar Sesion</Button>
                </Row>

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

            </Form>
        </Container>

    )
};

export default LoginPage;