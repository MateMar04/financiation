import React ,{useEffect} from "react";
import '../assets/styles/LandingPage.css'
import imagenPanal from "../assets/images/panell.jpeg";
import Logo from "../assets/images/LOGOGOBIERNO.png";
import {Button, Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const LandingPage = () => {
    useEffect(() => {
        document.body.classList.add("landing-page-body");
        return () => {
            document.body.classList.remove("landing-page-body");
        };
    }, []);
    return (
        <div className="landing-page">
            <Container fluid className="containerLanding">
                <Row className={'ThingsInLanding'}>
                    <Col md={8} className="imagen">
                        <img src={imagenPanal} alt="" className="imagen-diagonal"/>
                    </Col>
                    <Col md={6} className="overlay-content">
                        <div className="overlay-content-inner">
                            <Row>
                                <img src={Logo} className="ImgLogoFinanzasLanding" alt="Logo"/>
                            </Row>
                            <Row>
                                <p className={'pInLanding'}>Ya tengo una cuenta</p>
                            </Row>
                            <Row>
                                <Link to='/login/'>
                                    <Button className={'BtnLanding'}>Iniciar Sesión</Button>
                                </Link>
                            </Row>
                            <Row>
                                <p className={'pInLanding'}>No tengo una cuenta</p>
                            </Row>
                            <Row>
                                <Link to='/signin/'><Button className={'BtnLanding'}>Crea una Cuenta</Button></Link>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>


    );
}

export default LandingPage;
