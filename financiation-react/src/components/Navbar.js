import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../assets/styles/Navbar.css"
import logofinanzas from '../assets/images/logofinanzas.png';
function NavScrollExample() {
    return (
        <Navbar expand="lg" id="navbarcs" className="navbarcs">
            <Container fluid>
                <Navbar.Brand href="#home" id="logoboton" alt='logoboton'><img src={logofinanzas} id='logoboton'
                    alt="logo de ministerio de finanzas"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse>
                    <Nav className="me-auto my-2 my-lg-0">

                        <Nav.Link href="#action1" id="navbar">Nueva Consulta</Nav.Link>
                        <Nav.Link href="#action2" id="navbar">Hoja de Rutas</Nav.Link>
                        <Nav.Link href="#action3" id="navbar">Grupos</Nav.Link>
                        <Nav.Link href="#action4" id="navbar">Calendario</Nav.Link>
                    </Nav>

                    <Form className="d-flex">
                        <Button variant="outline-light">Acceder</Button>{' '}
                    </Form>

                </Navbar.Collapse>
            </Container>
        </Navbar >

    );
}

export default NavScrollExample;