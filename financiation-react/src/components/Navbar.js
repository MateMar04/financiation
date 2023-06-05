import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../assets/styles/navbar.css";
import logofinanzas from '../assets/images/logofinanzas.png';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NavigationBar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => (
        <>
            <Container fluid>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Nav.Item>
                            <Button variant="outline-light" className="navLinkSignup" href="/signup">
                                Crear Cuenta
                            </Button>

                        </Nav.Item>
                        <div className='mx-2'>
                        <Nav.Item>
                            <Button variant="outline-light" className="" href="/login">
                            Iniciar Sesión
                            </Button>
                        </Nav.Item>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );

    const authLinks = () => (
        <Nav.Item>
            <a className="nav-link" href="#!" onClick={logout}>
                Cerrar Sesión
            </a>
        </Nav.Item>
    );

    return (
        <Navbar expand="lg" id="navbarcs" className="navbarcs">
            <Container fluid>
                <Link to="/">
                    <Navbar.Brand id="logoboton" alt='logoboton'>
                        <img src={logofinanzas} id='logoboton' alt="logo de ministerio de finanzas" />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse>

                        {isAuthenticated ? authLinks() : guestLinks()}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavigationBar);