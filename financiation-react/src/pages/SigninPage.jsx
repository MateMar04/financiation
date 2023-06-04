import React from "react";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Logo from "../assets/images/PRUEBA.PNG";

const SigninPage = () => {
    return (
        <Container fluid className="general">
            <Container fluid className="image-container">
                <img src={Logo} alt="Logo del ministerio de finanzas"/>
            </Container>
            <Form onSubmit=''>
                <Row>
                    <Col lg="6">
                        <Form.Control placeholder="First name" type="text" name='first_name' value=''
                                      onChange='' required/>
                    </Col>
                    <Col lg="6">
                        <Form.Control placeholder="Last name" type="text" name='last_name' value=''
                                      onChange='' required/>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <Form.Control placeholder="Username" type="text" name='username' value=''
                                      onChange='' required/>
                    </Col>
                    <Col lg="6">
                        <Form.Control placeholder="SSN" type="number" name='ssn' value=''
                                      onChange='' required/>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <Form.Control placeholder="e-mail" type="email" name='email' value=''
                                      onChange='' required/>
                    </Col>
                    <Col lg="6">
                        <Form.Control placeholder="phone" type="tel" name='phone' value=''
                                      onChange='' required/>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <Form.Control placeholder="password" type="password" name="password" value=''
                                      onChange='' required/>
                    </Col>
                    <Col lg="6">
                        <Form.Control placeholder="re password" type="password" name="re_password" value=''
                                      onChange='' required/>
                    </Col>
                </Row>
                <Container>
                    <Button className="create" type="submit">Create Account</Button>
                </Container>
                <Container>
                    <Link to="/login/"><Button variant="link" className="link">Already have an account?
                        LogIn</Button></Link>
                </Container>
            </Form>
        </Container>
    );
}

export default SigninPage