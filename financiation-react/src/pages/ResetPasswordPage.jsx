import React from "react";
import {Button, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const ResetPasswordPage = () => {
    return (
        <Container className='mt-5'>
            <h1>Request Password Reset:</h1>
            <Form onSubmit=''>
                <Form.Group>
                    <Form.Control
                        placeholder='Email'
                        name='email'
                        value=''
                        onChange=''
                        required
                    />
                </Form.Group>
                <Button className='btn btn-primary' type='submit'>Reset Password</Button>
            </Form>
        </Container>
    );
}

export default ResetPasswordPage
