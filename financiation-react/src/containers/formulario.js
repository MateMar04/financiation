import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const MyComponent = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleDropdownChange = (eventKey) => {
        setSelectedOption(eventKey);
    };

    return (
        <div>
            <Dropdown onSelect={handleDropdownChange}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Seleccionar opción
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="componente1">Componente 1</Dropdown.Item>
                    <Dropdown.Item eventKey="componente2">Componente 2</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

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

export default MyComponent;
