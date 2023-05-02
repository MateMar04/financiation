import React, { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from 'primereact/dropdown';
import "../assets/styles/dropdown.css"
import { Container } from 'react-bootstrap';

export default function SelectArea() {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'Rentas', code: 'Rentas' },
        { name: 'Caja de Jubilados', code: 'CajaJubilados' },
        { name: 'Inspeccion de Personas Juridicas', code: 'IPJ' },
        { name: 'Registro Civil', code: 'RegistroCivil' },
        { name: 'Registro de la propiedad', code: 'RegistroPropiedad' },
        { name: 'Catastro', code: 'Catastro' },
        { name: 'Inteligencia fiscal', code: 'InteligenciaFiscal' },
        { name: 'ROPyCE', code: 'ROPyCE' },
        { name: 'Municipios y comunas', code: 'MunicipioComunas' }

    ];

    return (
        <Container fluid className="">
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                      placeholder="Seleccione Area" className="w-full md:w-14rem" />
        </div>
        </Container>
    )
}


