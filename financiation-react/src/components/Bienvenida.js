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


        /* <div className='container-fluid general'>
            <div className="row contenedor-imagen">
                <div className="col-lg-6">
                    <img src={imagenPanal} alt="" className="imagen"/>
                </div>
                <div className="col-lg-6 informacion">
                    <div className="card container-fluid carta">
                        <div className="container">
                            <img src={LOGOGOBIERNO} alt="React Logo" className="img-fluid"/>
                        </div>
                        <hr/>
                        <div className="contenedor">
                            <p>Si todavia no tenes una cuenta puede crearte una</p>
                            <input type="button" value="Crear" className="boton"/>
                        </div>
                        <hr/>
                        <div className="contenedor">
                            <p>Si ya tienes una cuenta accede</p>
                            <input type="button" value="Acceder" className="boton"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    */
    );
}

export default Bienvenida;