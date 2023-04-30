import React, {useState} from "react";
import {resetPassword} from "../actions/auth";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ResetPassword = (resetPassword) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        resetPassword(email)
        setRequestSent(true)
    };

    if (requestSent) {
        return <Navigate to='/'/>
    }

    return (
        <div>
            <Container fluid>
                <h1>Reset Password</h1>
                <Form onSubmit={e => onSubmit(e)}>
                    <Form.Control type='email' placeholder='email' name='email' value='email'
                                  onChange={e => onChange(e)} required></Form.Control>

                    <Button type='submit'>Send Email</Button>
                </Form>
            </Container>
        </div>
    );
};

export default connect(null, {resetPassword})(ResetPassword);