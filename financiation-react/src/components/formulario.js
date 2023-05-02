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
                <Container fluid className="image-container">
                    <img src={Logo} alt="Logo del ministerio de finanzas"/>
                </Container>
            <SelectArea/>
            </Container>
        );
    }
export default Formulario;