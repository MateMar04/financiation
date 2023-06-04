import React from "react";
import {Button, Container,} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const ResetPasswordConfirmPage = () => {
    return (
        <Container className='mt-5'>
            <Form onSubmit=''>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Confirm New Password'
                        name='new_password'
                        value=''
                        onChange=''
                        minLength='6'
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='New Password'
                        name='re_new_password'
                        value=''
                        onChange=''
                        minLength='6'
                        required
                    />
                </Form.Group>
                <Button type='submit'>Reset Password</Button>
            </Form>
        </Container>
    );
}

export default ResetPasswordConfirmPage