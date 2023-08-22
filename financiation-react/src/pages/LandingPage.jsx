import React from "react";
import '../assets/styles/LandingPage.css'
import imagenPanal from "../assets/images/panal.jpg";
import Logo from "../assets/images/LOGOGOBIERNO.png";
import {Button, Card, Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";


const LandingPage = () => {
    return (
        <div className={'stopScrolling'}>
            <Container fluid className="containerLanding">
                <Row>
                    <Col md={6} className="imagen">
                        <img src={imagenPanal} alt="" className="imagen-diagonal"/>
                    </Col>
                    <Col md={4} className={'justify-content-end'}>
                        <Row className={'justify-content-end'}>
                        <img src={Logo} className="ImgLogoFinanzasLanding"/>
                        <p>Si ya tienes una cuenta puedes iniciar sesión</p>
                        <Link to='/login/'><Button>Iniciar Sesión</Button></Link>
                        <p>Si no tienes una cuenta puedes crearte una</p>
                        <Link to='/signin/'><Button>Crea una Cuenta</Button></Link>
                            </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LandingPage