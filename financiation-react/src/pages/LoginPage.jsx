import React from "react";
import Container from "react-bootstrap/Container";
import Logo from "../assets/images/PRUEBA.PNG";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../assets/styles/LoginPage.css'
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <Container fluid className="general">
            <Container fluid className="image-container">
                <img src={Logo} alt="Logo del ministerio de finanzas"/>
            </Container>
            <Form onSubmit=''>
                <Container>
                    <Form.Control placeholder="Username" type="text" name="username"
                                  onChange='' required/>
                </Container>
                <Container>
                    <Form.Control placeholder="password" type="password" name="password"
                                  onChange='' minLength='6' required/>
                </Container>
                <Container fluid>
                    <Button type="submit">LogIn</Button>
                </Container>
            </Form>
            <Link to="/signup/"><Button variant="link" className="link">Dont have an account yet? SignIn</Button></Link>
            <Link to="/reset-password/"><Button variant="link" className="link">Forgot password</Button></Link>
        </Container>
    )
};


export default LoginPage;