import React, { useContext, useState } from "react";
import '../assets/styles/SigninPage.css'
import Logo from "../assets/images/PRUEBA.PNG";
import { Col, Container, Form, Row, } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const SigninPage = () => {
    const [error, setError] = useState(null);
    const [emailMatchError, setEmailMatchError] = useState(false);
    
    let { signIn } = useContext(AuthContext)
    
    return (
        
       <Container className="cardsign ">
            <Row className={'justify-content-center text-center'}>
                <img src={Logo} className="logosign" alt="Logo ministerio de finanzas" />
            </Row>
            <Row className={'justify-content-center text-center'}>
                <h2 className="titsign">Crear Cuenta</h2>
            </Row>
            <Form onSubmit={signIn}>
                <Row className={'justify-content-center text-center'}>
                    <Col lg="5">
                        <Form.Group>
                            <TextField
                                label="Nombre"
                                type="text"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                                }}
                                name='first_name'
                                required
                                className={'InputSigninPage'}
                                id="inputizq"
                            />
                        </Form.Group>
                    </Col>

                    <Col lg="5">
                        <Form.Group>
                            <TextField
                                label="Apellido"
                                type="text"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                                }}
                                name='last_name'
                                required
                                className={'InputSigninPage'}
                                id="inputder"
                            />
                        </Form.Group>
                    </Col>

                </Row>


                <Row className={'justify-content-center text-center'}>
                    <Col lg="5">
                        <Form.Group>
                            <TextField
                                label="Teléfono"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                                }}
                                type="tel"
                                name="phone_number"
                                required
                                className={'InputSigninPage'}
                                id="inputizq"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg="5">
                        <Form.Group>
                            <TextField
                                label="CUIL"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"> <AccountCircleOutlinedIcon /> </InputAdornment>),
                                    sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                                }}
                                type="text"
                                name='ssn'
                                required
                                className={'InputSigninPage'}
                                id="inputder"
                            />
                        </Form.Group>
                    </Col>

                </Row>

                <Row className={'justify-content-center text-center'}>
                    <Col lg="5">
                        <Form.Group>
                            <TextField
                                label="Correo Electrónico"
                                type="email"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                                }}
                                name="email"
                                required
                                className={'InputSigninPage'}
                                id="inputizq"
                            />
                        </Form.Group>
                    </Col>

                    <Col lg="5">
                        <Form.Group>

                            <TextField
                                label="Repetir Correo Electrónico"
                                type="email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                                }}
                                name="re_email"
                                required
                                className={'InputSigninPage'}
                                id="inputder"
                            />
                        </Form.Group>
                    </Col>
                    <label  className={`error ${emailMatchError ? 'show-error' : ''}`}> Los emails no coinciden </label>

                </Row>

                <container>

                <Row className={'justify-content-center text-center'}>
                    <Col lg="5">
                        <Form.Group>
                            <TextField
                                label="Contraseña"
                                variant="outlined"
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"> <VpnKeyOutlinedIcon/> </InputAdornment>
                                    ),
                                    sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                                }}
                                name="password"
                                required
                                className={'InputSigninPage'}
                                id="inputizq"
                            />
                        </Form.Group>
                      
                    </Col>
                    <Col lg="5">
                        <Form.Group>
                            <TextField
                                label="Repita la contraseña"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"> <VpnKeyOutlinedIcon/> </InputAdornment>
                                    ),
                                    sx: { borderRadius: 6, borderColor: '#f4f4f4' }
                                }}
                                type="password"
                                name="re_password"
                                required
                                
                                className={'InputSigninPage'}
                                id="inputder"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <p className="textoaclarador">
                            Utiliza 8 caracteres como minimo con una combinacion de letras y numeros
                        </p>
            </container>
                <Container>
                    <Row className={'justify-content-center text-center'}>
                        <Col>
                            <Button variant="contained" id="botonsign" color="primary" type="submit">
                                Crear
                            </Button>
                        </Col>
                    </Row>
                    <Row className={'justify-content-center text-center'}>
                        <Link to="/login/"><Button variant="link" id="linksign" className="link">
                            Ya tengo una cuenta
                        </Button></Link>
                    </Row>
                </Container>

            </Form>



        </Container>
    );
}

export default SigninPage