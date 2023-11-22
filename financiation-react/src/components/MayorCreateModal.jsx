import '../assets/styles/RowWithCheck.css'
import { Col, Row, Container, Card, Form } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import '../assets/styles/AddMayorPage.css';
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import { InputLabel, MenuItem, Select } from '@mui/material';
import { getLocations } from '../services/LocationServices';
import { message } from 'antd';

import { Button, Modal, Input } from 'antd';

export const MayorCreateModal = (props) => {

    let { authTokens } = useContext(AuthContext)
    const [selectedLocalidad, setSelectedLocalidad] = useState('');
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    let [locations, setLocations] = useState([])
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    useEffect(() => {
        getLocations(authTokens.access).then(data => setLocations(data))
    }, [])

    let postMayor = async () => {
        console.log('aaa')
        let response = await fetch('/api/mayors', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "location": selectedLocalidad
            })
        });

        if (response.status === 200) {
            toggleModalsucceed();
          
        } else {
           toggleModalfailed();
         
        }
    }

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const getItemNames = (array) => {
        return array?.map(item => ({
            label: item.name,
            value: item.id
        }));
    }

    return (
        <Modal className='modalcreate' title={'Ingresar Intendente'} open={props.show} onOk={postMayor} onCancel={props.onClose}>
            <SucceedModal onClose={() => toggleModalsucceed()} message="El intendente se ha creado exitosamente" show={showsuccess} />
            <FailedModal onClose={() => toggleModalfailed()} message="El intendente no se ha creado" show={showfail} />
            <Container className="containermayor container-addmayor-modal">

                <Form className='datos'>
                    <Container className='justify-content-center'>
                        <a>Nombre</a>
                        <Form.Group>
                            <Input
                                className="InputModal"
                                placeholder="Nombre"
                                name='first_name'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <a>Apellido</a>
                        <Form.Group>
                            <Input
                                className="InputModal"
                                name='last_name'
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Apellido"
                                size="large"
                            />
                        </Form.Group>

                        <a>Seleccione localidad</a>
                        <Select
                            label="Localidad"
                            value={selectedLocalidad}
                            onChange={(e) => setSelectedLocalidad(e.target.value)}
                            variant="outlined"
                            className='InputModal'
                            
                        >
                            {locations?.map((location, i) => (
                                <MenuItem key={i} value={location.id}>{location.name}</MenuItem>
                            ))}
                        </Select>

                    </Container>
                </Form>
            </Container>
        </Modal>
    )
}

export default MayorCreateModal