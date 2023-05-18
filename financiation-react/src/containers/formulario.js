import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/styles/formulario.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Municipios_y_Comunas, Rentas, Caja_de_Jubilados, IPJ, Registro_Civil,Registro_Propiedad, Catastro, Inteligencia_Fiscal, Ropyce} from "./Areas";



const Formulario = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
    <div>

                    <FormControl sx={{m:1, minWidth:500}}>
                        <InputLabel>Area</InputLabel>
                        <Select
                            value={selectedOption}
                            onChange={handleDropdownChange}
                            label="Area"

                        >
                            <MenuItem value="municipios_y_comunas">Municipios y Comunas</MenuItem>
                            <MenuItem value="rentas">Rentas</MenuItem>
                            <MenuItem value="caja_de_jubilados">Caja de Jubilados</MenuItem>
                            <MenuItem value="ipj">Inspeccion de Personas Juridicas</MenuItem>
                            <MenuItem value="registro_civil">Registro Civil</MenuItem>
                            <MenuItem value="registro_propiedad">Registro de la propiedad</MenuItem>
                            <MenuItem value="catastro">Catastro</MenuItem>
                            <MenuItem value="inteligencia_fiscal">Inteligencia Fiscal</MenuItem>
                            <MenuItem value="ropyce">ROPyCE</MenuItem>

                        </Select>
                    </FormControl>


        {selectedOption === "municipios_y_comunas" && <Municipios_y_Comunas />}
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

