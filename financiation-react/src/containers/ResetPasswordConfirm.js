import React, {useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {reset_password_confirm} from "../actions/auth";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Card} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";


const ResetPasswordConfirm = ({match, reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const {new_password, re_new_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const {uid} = useParams();
    const {token} = useParams();

    const onSubmit = e => {
        e.preventDefault();

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/'/>
    }

    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)}>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md='6'>
                            <Card >
                                <Card.Body>
                                    <div className='py-2'>
                                    <FloatingLabel controlId="floatingTextarea2" label="Introduzca su nueva contraseña">
                                    <input
                                        className='form-control'
                                        type='password'
                                        placeholder='Confirm New Password'
                                        name='new_password'
                                        value={new_password}
                                        onChange={e => onChange(e)}
                                        minLength='6'
                                        required
                                    />
                                    </FloatingLabel>
                                    </div>
                                    <div className='py-2'>
                                    <FloatingLabel controlId="floatingTextarea2" label="Repita su nueva contraseña">
                                        <input
                                            className='form-control'
                                            type='password'
                                            placeholder='Repita la contraseña'
                                            name='re_new_password'
                                            value={re_new_password}
                                            onChange={e => onChange(e)}
                                            minLength='6'
                                            required
                                        />
                                    </FloatingLabel>
                                    </div>
                                        <div className='py-2'>
                                        <button className='btn btn-primary' type='submit'>Cambiar Contraseña</button>
                                        </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>


            </form>
        </div>
    );
};

const mapStateProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateProps, {reset_password_confirm})(ResetPasswordConfirm);