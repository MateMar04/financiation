import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {reset_password} from "../actions/auth";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Card} from "react-bootstrap";


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
        <Container>
            <form onSubmit={e => onSubmit(e)}>
                <Container>
                    <Row className='justify-content-center'>
                    <Col md='6'>
                <Card >
                    <Card.Header as="h5">Restablecer su contraseña</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.
                        </Card.Text>
                        <input
                            className='form-control'
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                        <div className='py-3'>
                        <button className='btn btn-primary' type='submit'>Enviar</button>
                            </div>
                    </Card.Body>
                </Card>
                    </Col>
                </Row>
                </Container>
            </form>
            </Container>

    );
};

const mapStateProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateProps, {reset_password})(ResetPassword);