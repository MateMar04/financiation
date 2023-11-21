import '../assets/styles/RowWithCheck.css'
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Container, Card } from 'react-bootstrap';
import '../assets/styles/AddMayorPage.css';
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import { InputLabel, Select, MenuItem } from '@mui/material';
import { getDepartments } from '../services/DepartmentServices';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import {message} from 'antd';

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
            // toggleModalsucceed();
            props.setUpdateFlag((prevFlag) => !prevFlag);
            message.success('Se creó la localidad exitosamente');
            props.onClose();
        } else {
            // toggleModalfailed();
            console.error("No se pudo crear la localidad");
            props.onClose()
        }
    }
    
    return (
            <Modal className='modalcreate' show={props.show} >
                <SucceedModal onClose={() => toggleModalsucceed()} message="la visita" show={showsuccess}/>
                <FailedModal onClose={() => toggleModalfailed()} message="la visita" show={showfail}/>
                <Container className="containermayor container-addmayor-modal">

                    <Form className='datos'>
                        <h3 className={'h3LoginPage'}>Crear localidad</h3>

                        <div className='datosin' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Form.Group style={{ textAlign: 'center', marginRight: '10px' }}>
                                <TextField
                                    className="input"
                                    label="Nombre"
                                    name='name'
                                    onChange={(e) => setName(e.target.value)}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" >
                                                <AccountCircleOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 6, borderColor: '#f4f4f4' },
                                    }}
                                />
                            </Form.Group>
                        </div>

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                                    <Select
                                        label="Departamento"
                                        value={selectedDepartment}
                                        onChange={(e) => setSelectedDepartment(e.target.value)}
                                        variant="outlined"
                                        sx={{ width: '100%', height: '48px' }} 
                                    >
                                        {departments?.map((department) => (
                                            <MenuItem value={department.id}>{department.name}</MenuItem>
                                        ))}    
                                    </Select>
                            </FormControl>
                        </Box>

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button className='BtnIniciarSesionLogin btnregis' onClick={postLocation}>Registrar</Button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <Button variant="outlined" color="primary" onClick={props.onClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Modal>


    )
}

export default LocationCreateModal