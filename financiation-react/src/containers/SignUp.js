import React from "react";
import Container from "react-bootstrap/Container";
import Logo from "../assets/images/PRUEBA.PNG";
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import PasswordInput from "../components/PasswordInput";
import Button from "react-bootstrap/Button";
import "../assets/styles/signIn.css"

const SingUp = () => (
    <Container fluid className="general">
        <Container fluid className="image-container">
            <img src={Logo} alt="Logo del ministerio de finanzas"/>
        </Container>
        <Form>
            <Row>
                <Col lg="6">
                    <Form.Control placeholder="First name" type="text"/>
                </Col>
                <Col lg="6">
                    <Form.Control placeholder="Last name" type="text"/>
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <Form.Control placeholder="Username" type="text"/>
                </Col>
                <Col lg="6">
                    <Form.Control placeholder="SSN" type="number"/>
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <Form.Control placeholder="e-mail" type="email"/>
                </Col>
                <Col lg="6">
                    <Form.Control placeholder="phone" type="tel"/>
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <PasswordInput/>
                </Col>
                <Col lg="6">
                    <PasswordInput/>
                </Col>
            </Row>
            <Container>
                <Button className="create">Create Account</Button>
            </Container>
            <Container>
                <Button variant="link" className="link">Already have an account? LogIn</Button>
            </Container>
        </Form>
    </Container>
);

export default SingUp;