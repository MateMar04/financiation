import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../assets/styles/navbar.css"
import logofinanzas from '../assets/images/logofinanzas.png';

function NavScrollExample() {
    return (
        <Navbar expand="lg" id="navbarcs">
            <Container fluid>
                <Navbar.Brand href="#action1" id="logoboton" alt='logoboton'><img src={logofinanzas} id='logoboton'
                                                                                  alt="logo de ministerio de finanzas"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link href="#action2" id="navbar">Contacto</Nav.Link>
                        <NavDropdown title="Nosotros" id="navbar">
                            <NavDropdown.Item href="#action3">Nosotros</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" id="navbar">
                            Calendario
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="¿Que estas buscando?"
                            className="me-2"
                            aria-label="Search"
                            id="inputcs"
                        />
                        <Button variant="outline-success" id="buttoncs">Buscar</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;