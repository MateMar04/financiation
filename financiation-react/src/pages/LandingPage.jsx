import React ,{useEffect} from "react";
import '../assets/styles/LandingPage.css'
import imagenPanal from "../assets/images/panal.jpg";
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
                <Row>
                    <Col md={6} className="imagen">
                        <img src={imagenPanal} alt="" className="imagen-diagonal"/>
                    </Col>
                    <Col md={4} className="text-center">
                        <Row className="align-items-center">
                            <Col md={12}>
                                <img src={Logo} className="ImgLogoFinanzasLanding"/>
                                <p>Si ya tienes una cuenta puedes iniciar sesión</p>
                                <Link to='/login/'><Button>Iniciar Sesión</Button></Link>
                                <p>Si no tienes una cuenta puedes crearte una</p>
                                <Link to='/signin/'><Button>Crea una Cuenta</Button></Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LandingPage;
