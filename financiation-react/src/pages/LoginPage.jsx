import React, {useContext} from "react";
import '../assets/styles/LoginPage.css'
import Logo from "../assets/images/PRUEBA.PNG";
import {Button, Row, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';

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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountBoxIcon/>
                                </InputAdornment>
                            ),
                        }}
                        type="number"
                        name='ssn'
                        required
                        InputProps={{ sx: { borderRadius: 6 } }}
                        className={'InputLoginPage'}
                    />
                </Row>
                <Row className={'justify-content-center text-center py-4'}>
                    <TextField label="Contraseña" variant="outlined" InputProps={{ startAdornment: (<InputAdornment position="start"> <LockIcon/> </InputAdornment> ), }} type="password" name="password" required InputProps={{ sx: { borderRadius: 6 , borderColor: '#f4f4f4'} }} className={'InputLoginPage'} />
                </Row>
                <Row className={'justify-content-center text-center'}>
                    <Button type="submit" className="AccesButton">Iniciar Sesion</Button>
                </Row>

                <Row className={'justify-content-center text-center'}>
                    <Link to="/reset-password/">
                        <a>Olvidé mi contraseña</a>
                    </Link>
                </Row>
                <Row className={'justify-content-center text-center'}>
                    <Link to="/signin/">
                        <a>Crea una cuenta</a>
                    </Link>
                </Row>

            </Form>
        </Container>

    )
};

export default LoginPage;