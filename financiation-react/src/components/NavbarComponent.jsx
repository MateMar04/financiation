import React, {Fragment, useContext, useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/NavbarComponent.css"
import Logo from "../assets/images/LOGOGOBIERNO.png";
import {Button, Col, Container, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import {getUser} from "../services/UserServices";



const NavbarComponent = () => {

    let {authTokens} = useContext(AuthContext)
    let {user} = useContext(AuthContext)
    const [myUser, setMyUser] = useState()



    const getData = async () => {

        if (authTokens) {
            const usuario = await getUser(authTokens.access)
            setMyUser(usuario)
        }

    }

    useEffect(() => {

        getData();

    }, [authTokens]);
    return (

        <Navbar expand="lg" id="navbarcs" className="navbarcs">
            <Container fluid>
                <Link to="/">
                    <Navbar.Brand>
                        <img src={Logo} id='logoboton' alt="logo de ministerio de finanzas" className={'ImgNavBar'}/>
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="navbarScroll"/>

                <Navbar.Collapse>
                    {user ? (
                        <Container fluid>
                            <Row>

                                <Col className="d-flex justify-content-sm-center justify-content-md-start">
                                    <div className="mx-2">
                                        <Link to="/calendar/">
                                            <Button variant="text"
                                                    className={'BtnNavBar linksNavbar'}>Calendario</Button>

                                        </Link>
                                    </div>
                                    <div className="mx-2">
                                        <Link to="/form/">
                                            <Button variant="text"
                                                    className={'BtnNavBar linksNavbar'}>Formulario</Button>

                                        </Link>
                                    </div>
                                    <div className="mx-2">
                                        <Link to="/reports/">
                                            <Button variant="text" className={'BtnNavBar linksNavbar'}>Reportes</Button>
                                        </Link>
                                    </div>
                                </Col>
                                <Col className="d-flex justify-content-center justify-content-md-end linksNavbar">
                                    <div className="mx-2">
                                        <Row className={'justify-content-center'}>
                                            <Col md={3} xs={3} className={'justify-content-center '}>
                                            <Avatar src={'data:image/png;base64, ' + myUser?.profile_picture}
                                                        sx={{width: 40, height: 40}}/>
                                            </Col>



                                            <Col md={9} xs={9} className={'justify-content-center'}>
                                                <Row className={'justify-content-center text-center'}>
                                                    <a className={'aNavBar'}>¡Hola {myUser?.first_name}!</a>
                                                </Row>
                                                <Row className={'justify-content-center text-center'}>
                                                    <Link to="/me/">
                                                        <small className={'aNavBar'}>Ver perfil</small>
                                                    </Link>
                                                </Row>
                                            </Col>

                                        </Row>
                                    </div>
                                </Col>
                            </Row>

                        </Container>

                    ) : (
                        <Fragment>
                            <Container fluid>
                                <Row>
                                    <Col className="d-flex justify-content-end">
                                        <div className='mx-2'>
                                            <Link to='/login/'>
                                                <Button variant="text" className={'BtnNavBar'}>Iniciar Sesión</Button>
                                            </Link>
                                        </div>
                                        <div className="mx-2">
                                            <Link to='/signin/'>
                                                <Button variant="text" className={'BtnNavBar'}>Crear Cuenta</Button>
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