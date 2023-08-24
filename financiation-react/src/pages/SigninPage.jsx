import React, { useContext } from "react";
import '../assets/styles/SigninPage.css'
import Logo from "../assets/images/PRUEBA.PNG";
import { Col, Container, FloatingLabel, Form, Row, } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import AuthContext from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';



const SigninPage = () => {
    let { signIn } = useContext(AuthContext)
    return (
        <Container fluid className="general">
            <Container className="contsign">
                <Card className="cardsign">
                    <img src={Logo} className="logosign" alt="Logo ministerio de finanzas" />
                    <Container>
                        <h2>Crear Cuenta</h2>
                        <Form onSubmit={signIn}>
                            <Row className='justify-content-md-center'>
                                <Col lg="5" className='input-required'>
                                    <TextField
                                        label="Apellido"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        name='last_name'
                                        required
                                    />
                                </Col>
                                <Col lg="5" className='input-required'>
                                    <TextField
                                        label="Apellido"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        name='last_name'
                                        required
                                    />
                                </Col>
                            </Row>

                            <Row className='justify-content-md-center'>
                                <Col lg="5" className='input-required'>
                                    <TextField
                                        label="Teléfono"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="tel"
                                        name="phone"
                                        required
                                    />
                                </Col>
                                <Col lg="5" className='input-required'>
                                    <TextField
                                        label="CUIL"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountBoxIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="text" // Agrega el tipo "text"
                                        name='cuil'
                                        required
                                    />
                                </Col>
                            </Row>

                            <Row className='justify-content-md-center'>
                                <Col lg="5" className='input-required'>
                                    <TextField
                                        label="Correo Electrónico"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="email"
                                        name="email"
                                        required
                                    />
                                </Col>
                                <Col lg="5" className='input-required'>
                                    <TextField
                                        label="Repetir Correo Electrónico"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="email" // Usamos el tipo "email" para validar el formato
                                        name='email'
                                        required
                                    />
                                </Col>
                            </Row>

                            <Row className='justify-content-md-center'>
                                <Col lg="5" className='input-required'>
                                    <TextField
                                        label="Contraseña"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="password"
                                        name="password"
                                        required
                                    />
                                </Col>
                                <Col lg="5" className='input-required'>
                                    <TextField
                                        label="Repita la contraseña"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="password"
                                        name="re_password"
                                        required
                                    />
                                </Col>
                            </Row>

                            <Container>
                                <Row>
                                    <Col>
                                        <Button variant="contained" id="botonsign" color="primary" type="submit">
                                            Crear Cuenta
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Link to="/login/"><Button variant="link" className="link">
                                        Ya tengo una cuenta
                                    </Button></Link>
                                </Row>
                            </Container>

                        </Form>
                    </Container>
                </Card>
            </Container>
        </Container>
    );
}

export default SigninPage