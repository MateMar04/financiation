import React, { useState } from "react";
import SelectArea from "./dropdown";
import { Container } from 'react-bootstrap';
import Logo from "../assets/images/PRUEBA.PNG";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../assets/styles/formulario.css"

    function Formulario(){
        return(
            <Container fluid className="general">

                <div fluid className="col-md-2">
                    <h5 className="Text1"><b>NUEVA CONSULTA</b></h5>
                </div>

                <Container fluid className="col-md-11">
                <SelectArea/>
                </Container>
            </Container>
        );
    }
export default Formulario;