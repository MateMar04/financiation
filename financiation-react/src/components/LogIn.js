import React from 'react';
import '../assets/styles/login.css'
import Container from "react-bootstrap/Container";
import Logo from "../assets/images/PRUEBA.PNG";
import Form from "react-bootstrap/Form";
import PasswordInput from "./PasswordInput";
import Button from "react-bootstrap/Button";

function LogIn() {
    return (
        <Container fluid className="general">
            <Container fluid className="image-container">
                <img src={Logo} alt="Logo del ministerio de finanzas"/>
            </Container>
            <Form>
                <Container>
                    <Form.Control placeholder="Username" type="text"/>
                </Container>
                <Container>
                    <PasswordInput/>
                </Container>
                <Button className="login">LogIn</Button>
                <Container fluid>
                    <Button variant="link" className="link">Dont have an account yet? SignIn</Button>
                    <Button variant="link" className="link">Forgot password</Button>
                </Container>
            </Form>
        </Container>

    );
}

export default LogIn;




