import React, {useState} from "react";
import Logo from "../assets/images/PRUEBA.PNG";
import Form from "react-bootstrap/Form";
import {Button, FloatingLabel, Container} from "react-bootstrap";
import {connect} from "react-redux";
import {login} from "../actions/auth";
import '../assets/styles/login.css'
import {Link, Navigate} from "react-router-dom";

const LogIn = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        login(username, password);
    };

    if (isAuthenticated) {
        return <Navigate to='/'/>
    }

    return (
        <Container fluid className="general">
            <Container fluid className="image-container">
                <img src={Logo} alt="Logo del ministerio de finanzas"/>
            </Container>
            <Form onSubmit={e => onSubmit(e)}>
                <Container>
                    <FloatingLabel className='floatingLabel' label="Usuario">
                    <Form.Control placeholder="Usuario" type="text" name="username" value={username}
                                  onChange={e => onChange(e)} required/>
                    </FloatingLabel>
                </Container>
                <Container>
                    <FloatingLabel className='floatingLabel' label="Contraseña">
                    <Form.Control placeholder="Contraseña" type="password" name="password" value={password}
                                  onChange={e => onChange(e)} minLength='6' required/>
                    </FloatingLabel>
                </Container>
                <Container fluid>
                    <Button type="submit">Acceder</Button>
                </Container>
            </Form>
            <Link to="/signup/"><Button variant="link" className="link">No tengo una cuenta</Button></Link>
            <Link to="/reset-password/"><Button variant="link" className="link">Me olvidé la contraseña</Button></Link>
        </Container>
    )
};

const mapStateProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateProps, {login})(LogIn);