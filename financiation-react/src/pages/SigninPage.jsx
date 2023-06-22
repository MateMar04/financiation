import React, {useContext} from "react";
import '../assets/styles/LoginPage.css'
import Logo from "../assets/images/PRUEBA.PNG";
import {Button, Container, FloatingLabel, Form, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const SigninPage = () => {
    let {signIn} = useContext(AuthContext)
    return (
        <Container fluid className="general">
            <img src={Logo} alt="Logo ministerio de finanzas"/>
            <Container>
                <Form onSubmit={signIn}>
                    <Row className='justify-content-md-center'>
                        <Col lg="5" className='input-required'>
                            <FloatingLabel className='floatingLabel' label="Nombre">
                                <Form.Control placeholder="Nombre" type="text" className='input-required'
                                              name='first_name' required/>
                            </FloatingLabel>
                        </Col>
                        <Col lg="5" className='input-required'>
                            <FloatingLabel className='floatingLabel' label="Apellido">
                                <Form.Control placeholder="Apellido" type="text" name='last_name' required/>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row className='justify-content-md-center'>
                        <Col lg="5" className='input-required'>
                            <FloatingLabel className='floatingLabel' label="Usuario">
                                <Form.Control placeholder="Usuario" type="text" name='username' required/>
                            </FloatingLabel>
                        </Col>
                        <Col lg="5" className='input-required'>
                            <FloatingLabel className='floatingLabel' label="DNI">
                                <Form.Control placeholder="DNI" type="number" name='ssn' required/>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row className='justify-content-md-center'>
                        <Col lg="5" className='input-required'>
                            <FloatingLabel className='floatingLabel' label="Correo Electrónico">
                                <Form.Control placeholder="Correo electronico" type="email" name='email' required/>
                            </FloatingLabel>
                        </Col>
                        <Col lg="5" className='input-required'>
                            <FloatingLabel className='floatingLabel' label="Telefono">
                                <Form.Control placeholder="Telefono" type="tel" name='phone' required/>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row className='justify-content-md-center'>
                        <Col lg="5" className='input-required'>
                            <FloatingLabel className='floatingLabel' label="Contraseña">
                                <Form.Control placeholder="Contraseña" type="password" name="password" required/>
                            </FloatingLabel>
                        </Col>
                        <Col lg="5" className='input-required'>
                            <FloatingLabel className='floatingLabel' label="Repita la contraseña">
                                <Form.Control placeholder="Repita Contraseña" type="password" name="re_password"
                                              required/>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Container>
                        <Row>
                            <Col>
                                <Button className="create" type="submit">Crear Cuenta</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Link to="/login/"><Button variant="link" className="link">Ya tengo una
                                cuenta</Button></Link>
                        </Row>
                    </Container>

                </Form>
            </Container>
        </Container>
    );
}

export default SigninPage