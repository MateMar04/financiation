import React, {useContext} from "react";
import '../assets/styles/LoginPage.css'
import Logo from "../assets/images/PRUEBA.PNG";
import {Button, Card, Container, FloatingLabel, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        
        
    <Container fluid className="general">
        <Card className="GeneralCard">
            
                <img src={Logo} className="Image"   alt="Logo del ministerio de finanzas"/>

            <Container fluid className="Titulo1">
                    <p>Iniciar Sesion</p>
                </Container>
            <Form onSubmit={loginUser}>
                
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
                
                <Container className="SecondTextField">
                
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
                </Container>
                <Container fluid>
                    <Button type="submit" className="AccesButton">Iniciar Sesion</Button>
                </Container>
            </Form>
            <Link to="/reset-password/"><Button variant="link" className="link">Me olvidé la contraseña</Button></Link>
            <Link to="/signin/"><Button variant="link" className="link">No tengo una cuenta</Button></Link>
            
            </Card>
        </Container>
        
    )
};

export default LoginPage;