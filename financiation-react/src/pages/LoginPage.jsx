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
            <Row className={'justify-content-center text-center'}>
                <img src={Logo} className="ImgLogoLogin" alt="Logo del ministerio de finanzas"/>
            </Row>
            <Row className={'justify-content-center text-center'}>
                <h3>Iniciar Sesion</h3>
            </Row>

            <Form onSubmit={loginUser}>
                <TextField
                    label="CUIL"
                    variant="standard"
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
                />

                <Container className="SecondTextField">

                    <TextField
                        label="Contraseña"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon/>
                                </InputAdornment>
                            ),
                        }}
                        type="password"
                        name="password"
                        required
                    />
                </Container>
                <Container fluid>
                    <Button type="submit" className="AccesButton">Iniciar Sesion</Button>
                </Container>
            </Form>
            <Link to="/reset-password/"><Button variant="link" className="link">Olvidé mi contraseña</Button></Link>
            <Link to="/signin/"><Button variant="link" className="link">Crea una cuenta</Button></Link>


        </Container>

    )
};

export default LoginPage;