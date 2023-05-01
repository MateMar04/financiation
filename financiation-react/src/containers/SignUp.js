import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Logo from "../assets/images/PRUEBA.PNG";
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../assets/styles/signIn.css"
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";


const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        ssn: '',
        email: '',
        phone: '',
        password: '',
        re_password: ''
    });

    const {first_name, last_name, username, ssn, email, phone, password, re_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            signup(first_name, last_name, username, ssn, email, phone, password, re_password);
            setAccountCreated(true)
        }
    };

    if (isAuthenticated) {
        return <Navigate to='/'/>
    }
    if (accountCreated) {
        return <Navigate to='/login/'/>
    }
    return (
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
                        <Form.Control placeholder="password" type="password" name="password" value={password}
                                      onChange={e => onChange(e)} minLength='6' required/>
                    </Col>
                    <Col lg="6">
                        <Form.Control placeholder="re password" type="password" name="re_password" value={re_password}
                                      onChange={e => onChange(e)} minLength='6' required/>
                    </Col>
                </Row>
                <Container>
                    <Button className="create">Create Account</Button>
                </Container>
                <Container>
                    <Link to="/login/"><Button variant="link" className="link">Already have an account?
                        LogIn</Button></Link>
                </Container>
            </Form>
        </Container>
    );
}

const mapStateProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateProps, {login})(LogIn);