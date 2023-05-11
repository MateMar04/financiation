import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/registrovisita.css"
import "primereact/resources/primereact.min.css";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

export default function Registrovisita() {
    const [value2, setValue2] = useState();
    const [selectedCity, setSelectedCity] = useState(null);
    const localidades = [
        { name: 'Alta Gracia', code: 'NY' },
        { name: 'Cosquin', code: 'RM' },
        { name: 'Villa Carlos Paz', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }

    ];

    return (
        <div className="container-fluid">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div>
                        <h2 id="tittle">Registro de Visitas</h2>
                    </div>
                    <div className="container">
                        <input type="text" id="input2" placeholder="Localidad" />
                        <input type="text" id="input2" placeholder="Area" />
                        <Form.Control type="date" id="input3" name="dob" placeholder="Fecha" />
                    </div>
                    <div className="container">
                        <input type="text" id="input1" placeholder="Nombre" />
                        <input type="text" id="input2" placeholder="Cargo" />
                        <input type="text" id="input3" placeholder="Numero" />
                    </div>
                    <div className="container">
                        <input type="text" id="inputt1" placeholder="Rango Horario" />
                        <input type="text" id="inputt2" placeholder="Lugar" />
                        <Button id="bt1" variant="primary">Registar</Button>{' '}
                    </div>
                </div>
            </div>
        </div>

    )
}






