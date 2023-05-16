import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/styles/formulario.css"


const Formulario = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Container className="general1">
            <Row className="justify-content-md-center">
            <Col md="3">
            <select value={selectedOption} onChange={handleDropdownChange} className="dropdowAreas">
                <option value="">Seleccionar opción</option>
                <option value="componente1">Componente 1</option>
                <option value="componente2">Componente 2</option>
            </select>

            {selectedOption === "componente1" && <Componente1 />}
            {selectedOption === "componente2" && <Componente2 />}
            </Col>
                </Row>

        </Container>
    );
};

const Componente1 = () => {
    return <h2>Componente 1</h2>;
};

const Componente2 = () => {
    return <h2>Componente 2</h2>;
};

export default Formulario;