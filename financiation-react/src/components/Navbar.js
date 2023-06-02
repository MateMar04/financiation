import React, {Fragment} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../assets/styles/navbar.css"
import logofinanzas from '../assets/images/logofinanzas.png';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../actions/auth";


const NavigationBar = ({logout, isAuthenticated}) => {

    const guestLinks = () => (
        <Fragment>
            <Nav.Item>
                <Button variant="outline-light" to="/login/" className='navlinks' href='/login'>Iniciar Sesion</Button>
            </Nav.Item>
            <Nav.Item>
                <Button variant="outline-light" to="/signup/" className='navlinks' href='/signup'>Crear Cuenta</Button>
            </Nav.Item>
        </Fragment>
    );

    const authLinks = () => (
        <Nav.Item>
            <a className="nav-link" href="#!" onClick={logout}>Cerrar Sesion</a>
        </Nav.Item>
    );

    return (
        <Navbar expand="lg" id="navbarcs" className="navbarcs">
            <Container fluid>
                <Link to="/">
                    <Navbar.Brand id="logoboton" alt='logoboton'><img src={logofinanzas} id='logoboton'
                                                                      alt="logo de ministerio de finanzas"/>
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="navbarScroll"/>

                <Navbar.Collapse>
                    <Nav className="me-auto my-2 my-lg-0">

                        {isAuthenticated ? authLinks() : guestLinks()}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(NavigationBar);
