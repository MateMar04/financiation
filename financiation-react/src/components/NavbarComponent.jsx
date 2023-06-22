import React, {Fragment, useContext} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/NavbarComponent.css"
import logofinanzas from '../assets/images/logofinanzas.png';
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";


const NavbarComponent = () => {

    let {user, logoutUser} = useContext(AuthContext)

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
                    {user ? (
                        <Container fluid>
                            <Row>
                                <Col className="d-flex justify-content-end">
                                    <Nav.Link>
                                        <Button variant="outline-light" onClick={logoutUser}>
                                            Cerrar Sesión
                                        </Button>

                                    </Nav.Link>
                                </Col>
                            </Row>
                        </Container>

                    ) : (
                        <Fragment>
                            <Container fluid>
                                <Row>
                                    <Col className="d-flex justify-content-end">
                                        <Link to='/signin/'>
                                            <Button variant="outline-light">
                                                Crear Cuenta
                                            </Button>
                                        </Link>


                                        <div className='mx-2'>
                                            <Link to='/login/'>
                                                <Button variant="outline-light">
                                                    Iniciar Sesión
                                                </Button>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Fragment>

                    )
                    }


                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default NavbarComponent;
