import React from "react";
import Container from "react-bootstrap/Container";
import imagenPanal from "../assets/images/panal.jpg";
import {Card} from "react-bootstrap";
import Logo from "../assets/images/LOGOGOBIERNO.png";
import Button from "react-bootstrap/Button";
import "../assets/styles/bienvenida.css"
import {Link} from "react-router-dom";

const Home = () => (
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
                <p>Si todavia no tenes una cuenta puede crearte una</p>
                <Link to='/signup/'><Button>Crea una Cuenta</Button></Link>
            </Container>
        </Card>
    </Container>
);

export default Home;