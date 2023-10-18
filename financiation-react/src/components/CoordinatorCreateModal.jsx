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
import FailedModal from "./FailedModal";
import SucceedModal from "./SucceedModal";
import {getUsers} from "../services/UserServices";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export const CoordinatorCreateModal = (props) => {

    let { authTokens } = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const [users, setUsers] = React.useState();
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const [selectedUserId, setSelectedUserId] = useState(null);
    useEffect(() => {
        getUsers(authTokens.access).then(data => setUsers(data));
    }, []);

    let postCoordinator = async () => {
        if (selectedUserId) { 
            let response = await fetch('/api/coordinators', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "JWT " + String(authTokens.access),
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "user_id": selectedUserId,
                    "group_id": props.group.id
                })
            })
            if (response.status === 200) {
                toggleModalsucceed();
            } else {
                toggleModalfailed();
            }
        } else {
            toggleModalfailed()
        }
    }

    return (
        <Modal className='modalcreate' show={props.show} >
            <SucceedModal onClose={() => toggleModalsucceed()} message="la visita" show={showsuccess} />
            <FailedModal onClose={() => toggleModalfailed()} message="la visita" show={showfail} />
            <Container className="containermayor container-addmayor-modal">

                <Form>
                    <h3 className={'h3LoginPage crearintendente'}>Crear coordinador</h3>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Nombre del usuario</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Nombre de la persona"
                                value={selectedUserId} 
                                onChange={(event) => {
                                    console.log('Selected User ID:', event.target.value);
                                    setSelectedUserId(event.target.value);
                                }}

                            >
                                {users?.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>{user.name}{user.last_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button className='BtnIniciarSesionLogin btnregis' onClick={postCoordinator}>Registrar</Button>
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

export default CoordinatorCreateModal