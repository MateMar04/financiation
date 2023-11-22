import '../assets/styles/RowWithCheck.css'
import {Container } from "react-bootstrap";
import {Form} from "react-bootstrap";
import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import '../assets/styles/AddMayorPage.css';
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import {getDepartments} from '../services/DepartmentServices';
import FormControl from '@mui/material/FormControl';

import {MenuItem, Select} from '@mui/material';
import {message, Modal, Input} from 'antd';

export const LocationCreateModal = (props) => {

    let {authTokens} = useContext(AuthContext)
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    let [departments, setDepartments] = useState([])
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    useEffect(() => {
        getDepartments(authTokens.access).then(data => setDepartments(data))
    }, [])

    let postLocation = async () => {
        let response = await fetch('/api/locations', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "department": selectedDepartment
            })
        });

        if (response.status === 200) {
            props.setUpdateFlag((prevFlag) => !prevFlag);
            message.success('Se creó la localidad exitosamente');
            props.onClose();
        } else {
            console.error("No se pudo crear la localidad");
            props.onClose()
        }
    }

    return (
        <Modal className='modalcreate' open={props.show} onCancel={props.onClose} onOk={postLocation}
               title={'Crear Localidad'}>
            <Container className="containermayor container-addmayor-modal">

                <Form className='datos'>
                    <a>Nombre de la nueva localidad</a>
                    <Form.Group>
                        <Input
                            className="InputModal"
                            placeholder="Nombre"
                            name='name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <br/>

                    <a>Departamento</a>
                    <FormControl fullWidth>
                        <Select
                            label="Departamento"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className='InputModal'
                            id="standard-basic"
                        >
                            {departments?.map((department, i) => (
                                <MenuItem key={i} value={department.id}>{department.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Form>
            </Container>
        </Modal>


    )
}

export default LocationCreateModal