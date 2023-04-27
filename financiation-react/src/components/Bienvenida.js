import React from 'react';
import imagenPanal from '../assets/images/panal.jpg'
import Logo from "../assets/images/LOGOGOBIERNO.png"
import Container from "react-bootstrap/Container";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import '../assets/styles/bienvenida.css'

function Bienvenida() {
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
                    <p>Si todavia no tenes una cuenta puede crearte una</p>
                    <Button>Crea una Cuenta</Button>
                </Container>
                <hr/>
                <Container>
                    <p>Si todavia no tenes una cuenta puede crearte una</p>
                    <Button>Crea una Cuenta</Button>
                </Container>
            </Card>
        </Container>
    );
}

export default Bienvenida;