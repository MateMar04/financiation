import React, {useState} from "react";
import Logo from "../assets/images/PRUEBA.PNG";
import Form from "react-bootstrap/Form";
import {Col, Row, FloatingLabel, Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../assets/styles/login.css"
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {signup} from "../actions/auth";


const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        ssn: '',
        email: '',
        phone: '',
        password: '',
        re_password: ''
    });

    const {first_name, last_name, username, ssn, email, phone, password, re_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            signup(first_name, last_name, username, ssn, email, phone, password, re_password);
            setAccountCreated(true)
        }
    };

    if (isAuthenticated) {
        return <Navigate to='/'/>
    }
    if (accountCreated) {
        return <Navigate to='/login/'/>
    }
    return (
        <Container fluid className="general">
                <img src={Logo} alt="Logo ministerio de finanzas"/>
        <Container>
            <Form onSubmit={e => onSubmit(e)}>
                <Row className='justify-content-md-center'>
                    <Col lg="5" className='input-required'>
                        <FloatingLabel className='floatingLabel' label="Nombre">
                        <Form.Control placeholder="Nombre" type="text" className='input-required' name='first_name' value={first_name}
                                      onChange={e => onChange(e)} required/>
                        </FloatingLabel>
                    </Col>
                    <Col lg="5" className='input-required'>
                        <FloatingLabel className='floatingLabel' label="Apellido">
                        <Form.Control placeholder="Apellido" type="text" name='last_name' value={last_name}
                                      onChange={e => onChange(e)} required/>
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className='justify-content-md-center'>
                    <Col lg="5" className='input-required'>
                        <FloatingLabel className='floatingLabel' label="Usuario">
                        <Form.Control placeholder="Usuario" type="text" name='username' value={username}
                                      onChange={e => onChange(e)} required/>
                        </FloatingLabel>
                    </Col>
                    <Col lg="5" className='input-required'>
                        <FloatingLabel className='floatingLabel' label="DNI">
                        <Form.Control placeholder="DNI" type="number" name='ssn' value={ssn}
                                      onChange={e => onChange(e)} required/>
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className='justify-content-md-center'>
                    <Col lg="5" className='input-required'>
                        <FloatingLabel className='floatingLabel' label="Correo Electrónico">
                        <Form.Control placeholder="Correo electronico" type="email" name='email' value={email}
                                      onChange={e => onChange(e)} required/>
                        </FloatingLabel>
                    </Col>
                    <Col lg="5" className='input-required'>
                        <FloatingLabel className='floatingLabel' label="Telefono">
                        <Form.Control placeholder="Telefono" type="tel" name='phone' value={phone}
                                      onChange={e => onChange(e)} required/>
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className='justify-content-md-center'>
                    <Col lg="5" className='input-required'>
                        <FloatingLabel className='floatingLabel' label="Contraseña">
                        <Form.Control placeholder="Contraseña" type="password" name="password" value={password}
                                      onChange={e => onChange(e)} required/>
                        </FloatingLabel>
                    </Col>
                    <Col lg="5" className='input-required'>
                        <FloatingLabel className='floatingLabel' label="Repita la contraseña">
                        <Form.Control placeholder="Repita Contraseña" type="password" name="re_password" value={re_password}
                                      onChange={e => onChange(e)} required/>
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
                    <Link to="/login/"><Button variant="link" className="link">Ya tengo una cuenta</Button></Link>
                    </Row>
                </Container>

            </Form>
        </Container>
        </Container>

    );
}

const mapStateProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateProps, {signup})(Signup);