import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/styles/formulario.css";
import {Rentas, Caja_de_Jubilados, IPJ, Registro_Civil,Registro_Propiedad, Catastro, CiDi, Otros} from "./Areas";
import Button from "react-bootstrap/Button";


const Formulario = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const selectStyle = {
        padding: '15px',
    };

    return (
        <div>
        <Container>
            <Row>

                <Col>
                    <select
                        placeholder="Localidad"
                        className='form-select'
                    >
                        <option>Localidad</option>
                    </select>
                </Col>
                <Col>
                    <select
                        placeholder="Localidad"
                        className='form-select'
                    >
                        <option>Asesor que atendió</option>
                    </select>
                </Col>
                <Col><input type="date" className='input-group-text'></input></Col>
                </Row>
            <div className="py-3">
            <Row className='justify-content-md-center'>
                <Col xs={12} md={10}>
                        <select
                            value={selectedOption}
                            onChange={handleDropdownChange}
                            placeholder="Area"
                            className='form-select'
                            style={selectStyle}
                        >
                            <option>Areas</option>
                            <option value="rentas">Rentas</option>
                            <option value="registro_civil">Registro Civil</option>
                            <option value="catastro">Catastro</option>
                            <option value="caja_de_jubilados">Caja de Jubilaciones</option>
                            <option value="CiDi">CiDi</option>
                            <option value="ipj">Inspeccion de Personas Juridicas</option>
                            <option value="registro_propiedad">Registro de la propiedad</option>
                        </select>
                </Col>
            </Row>
            </div>
        </Container>

            {selectedOption === "rentas" && <Rentas />}
            {selectedOption === "registro_civil" && <Registro_Civil />}
            {selectedOption === "catastro" && <Catastro/>}
            {selectedOption === "caja_de_jubilados" && <Caja_de_Jubilados />}
            {selectedOption === "CiDi" && <CiDi/>}
            {selectedOption === "ipj" && <IPJ />}
            {selectedOption === "registro_propiedad" && <Registro_Propiedad />}


    <Container>

        <Row className='justify-content-md-center'>
            <Col xs={12} md={10}>
                <select
                    placeholder="Por que vino?"
                    className='form-select'
                    style={selectStyle}
                >
                    <option>¿Por que vino?</option>
                    <option>No conoce los canales de atención habilitados</option>
                    <option>No logró realizar la gestión vía web/online</option>
                    <option>No dispone de acceso a tecnología/internet</option>
                    <option>Prefiere atención presencial</option>
                    <option value="otros">Otros</option>

                </select>
                {selectedOption === "otros" && <Otros/>}
            </Col>
        </Row>
        <div className="py-3">
        <Row className='justify-content-md-center'>
        <Col xs={3} md={2}>
            <Button variant="secondary" size="sm">Enviar Consulta</Button>
        </Col>
        </Row>
        </div>
    </Container>
    </div>

    );
};


export default Formulario;

