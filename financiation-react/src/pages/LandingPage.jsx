import React from "react";
import '../assets/styles/LandingPage.css'
import imagenPanal from "../assets/images/panal.jpg";
import Logo from "../assets/images/LOGOGOBIERNO.png";
import {Button, Card, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


const LandingPage = () => {
    return (
        <div className={'stopScrolling'}>
        <Container fluid className="containerLanding">
                <div className="imagen">
                <img src={imagenPanal} alt="" className="imagen-diagonal"/>
                    </div>


            <Container>
                <Row className={'justify-content-end text-center'}>


                    <img src={Logo} className="ImgLogoFinanzasLanding"/>
                    <p>Si ya tienes una cuenta puedes iniciar sesion</p>
                    <Link to='/login/'><Button>Iniciar Sesion</Button></Link>
                    <p>Si no tienes una cuenta puede crearte una</p>
                    <Link to='/signin/'><Button>Crea una Cuenta</Button></Link>


                </Row>
            </Container>
        </Container>
            </div>
    );
}

export default LandingPage