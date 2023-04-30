import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Logo from "../assets/images/PRUEBA.PNG";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import { login } from "../actions/auth";
import '../assets/styles/login.css'
import {Link, Navigate} from "react-router-dom";

const LogIn = ({ login, isAuthenticated }) => {
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

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

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
            <Link to="/signup/"><Button variant="link" className="link">Dont have an account yet? SignIn</Button></Link>
            <Link to="/reset-password/"><Button variant="link" className="link" >Forgot password</Button></Link>
        </Container>
    )
};

const mapStateProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateProps, { login })(LogIn);