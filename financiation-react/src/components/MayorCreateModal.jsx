import '../assets/styles/RowWithCheck.css'
import  {Container, Form } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import '../assets/styles/AddMayorPage.css';
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import { MenuItem, Select } from '@mui/material';
import { getLocations } from '../services/LocationServices';
import {Modal, Input, message} from 'antd';

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
             message.success('El intendente se ha creado exitosamente');
            props.onClose();
          
        } else {
           message.error('El intendente no se ha creado');
        }
    }

    return (
        <Modal className='modalcreate' title={'Ingresar Intendente'} open={props.show} onOk={postMayor} onCancel={props.onClose}>
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
                        <br/>
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
                        <br/>

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