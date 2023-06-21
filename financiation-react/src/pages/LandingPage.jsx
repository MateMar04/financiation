import React from "react";
import '../assets/styles/LandingPage.css'
import imagenPanal from "../assets/images/panal.jpg";
import Logo from "../assets/images/LOGOGOBIERNO.png";
import {Button, Card, Col, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const LandingPage = () => {
    return (
        <Container fluid className="background">
            <Container fluid>
                <img src={imagenPanal} alt="" className="imagen"/>
            </Container>
            <Card id="carta">
                <Container>
                    <img src={Logo} alt="React Logo" className="img-fluid"/>
                </Container>
                <hr/>
                <Container>
                    <p>Si ya tienes una cuenta puedes iniciar sesion</p>
                    <Link to='/login/'><Button>Iniciar Sesion</Button></Link>
                </Container>
                <hr/>
                <Container>
                    <p>Si no tienes una cuenta puede crearte una</p>
                    <Link to='/signup/'><Button>Crea una Cuenta</Button></Link>
                    <div className='py-2'></div>
                </Container>
            </Card>
        </Container>
    );
}

export default LandingPage