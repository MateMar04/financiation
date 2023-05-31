import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {reset_password} from "../actions/auth";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../assets/styles/resetPassword.css'


const ResetPassword = ({reset_password}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email)
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/'/>
    }

    return (
        <Container className='resetpswd'>
            <h2>Restablecer contraseña:</h2>
            <form onSubmit={e => onSubmit(e)}>
                <Row className='justify-content-md-center'>
                    <Col lg="5" className='input-required'>
                        <a>Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</a>
                        <h6>Introduzca su email</h6>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />

                    </Col>

                </Row>
                <Row>
                    <Col>
                <button className='btn btn-primary' type='submit'>Restablecer Contraseña</button>
                    </Col>
                </Row>
            </form>
            </Container>

    );
};

const mapStateProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateProps, {reset_password})(ResetPassword);