import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Logo from "../assets/images/PRUEBA.PNG";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import { login } from "../actions/auth";
import '../assets/styles/login.css'

const LogIn = ({ login }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        login(username, password);
    };

    return (
        <Container fluid className="general">
            <Container fluid className="image-container">
                <img src={Logo} alt="Logo del ministerio de finanzas"/>
            </Container>
            <Form onSubmit={e => onSubmit(e)}>
                <Container>
                    <Form.Control placeholder="Username" type="text" name="username" value={username}
                                  onChange={e => onChange(e)} required/>
                </Container>
                <Container>
                    <Form.Control placeholder="password" type="password" name="password" value={password}
                                   onChange={e => onChange(e)} minLength='6' required/>
                </Container>
                <Container fluid>
                    <Button type="submit">LogIn</Button>
                </Container>
            </Form>
            <Button variant="link" className="link" href="/signup">Dont have an account yet? SignIn</Button>
            <Button variant="link" className="link" href="/reset-password">Forgot password</Button>
        </Container>
    )
};



export default connect(null, { login })(LogIn);