import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/styles/formulario.css";
import {Rentas, Caja_de_Jubilados, IPJ, Registro_Civil,Registro_Propiedad, Catastro, Inteligencia_Fiscal, Ropyce} from "./Areas";

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
                <Col xs={6} md={4}>
                    <select
                        placeholder="Localidad"
                        className='form-select'
                    >
                        <option>Localidad</option>
                    </select>
                </Col>
                <Col xs={6} md={4}>
                    <select
                        placeholder="Localidad"
                        className='form-select'
                    >
                        <option>Asesor que atendió</option>
                    </select>
                </Col>

                <Col xs={6} md={4}><input type="date" className='input-group-text'></input></Col>
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
                            <option value="inteligencia_fiscal">CiDi</option>
                            <option value="ipj">Inspeccion de Personas Juridicas</option>
                            <option value="registro_propiedad">Registro de la propiedad</option>

                        </select>


                </Col>
            </Row>
            </div>
        </Container>

        {selectedOption === "municipios_y_comunas" && <Rentas />}
        {selectedOption === "rentas" && <Rentas />}
        {selectedOption === "caja_de_jubilados" && <Caja_de_Jubilados />}
        {selectedOption === "ipj" && <IPJ />}
        {selectedOption === "registro_civil" && <Registro_Civil />}
        {selectedOption === "registro_propiedad" && <Registro_Propiedad />}
        {selectedOption === "catastro" && <Catastro/>}
        {selectedOption === "inteligencia_fiscal" && <Inteligencia_Fiscal />}
        {selectedOption === "ropyce" && <Ropyce />}
    </div>
    );
};


export default Formulario;

