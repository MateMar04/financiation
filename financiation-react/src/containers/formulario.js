import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/styles/formulario.css";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const Formulario = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
    <div>
        <Container className="general1">
            <Row className="justify-content-md-center">
                <Col md="11">
                    <h1>Elegir area</h1>
                    <FormControl sx={{ m: 1, minWidth: 800 }}>
                        <InputLabel>Area</InputLabel>
                        <Select
                            value={selectedOption}
                            onChange={handleDropdownChange}
                            autoWidth
                            label="Area"
                        >

                <MenuItem value="componente1">Componente 1</MenuItem>
                <MenuItem value="componente2">Componente 2</MenuItem>
            </Select>
        </FormControl>
                </Col>
            </Row>
        </Container>

        {selectedOption === "componente1" && <Componente1 />}
        {selectedOption === "componente2" && <Componente2 />}
    </div>
    );
};


const Componente1 = () => {
    return <h2>Componente 1</h2>;
};

const Componente2 = () => {
    return <h2>Componente 2</h2>;
};

export default Formulario;

