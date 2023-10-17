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

export const AdvisorCoordinatorCreateModal = (props) => {

    let { authTokens } = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const [users, setUsers] = React.useState();
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    useEffect(() => {
        getUsers(authTokens.access).then(data => setUsers(data));
    }, []);

    let postCoordinator = async (e) => {
        e.preventDefault();

        const firstName = e.target.first_name.value;
        const lastName = e.target.last_name.value;

        // Check if either the first name or last name is empty
        if (!firstName || !lastName) {
            // Display an error message or take appropriate action
            toggleModalfailed();
            return;
        }

        let response = await fetch('/api/mayors', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName
            })
        });
        if (response.status === 200) {
            toggleModalsucceed();
        } else if (response.status === 500) {
            toggleModalfailed();
        }
    }

    return (
        <Modal className='modalcreate' show={props.show} >
            <SucceedModal onClose={() => toggleModalsucceed()} message="la visita" show={showsuccess} />
            <FailedModal onClose={() => toggleModalfailed()} message="la visita" show={showfail} />
            <Container className="containermayor container-addmayor-modal">

                <Form onSubmit={postCoordinator}>
                    <h3 className={'h3LoginPage crearintendente'}>Crear coordinador</h3>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Nombre del usuario</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Nombre de la persona"
                            >
                                {users?.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>{user.name}{user.last_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button className='BtnIniciarSesionLogin btnregis' type="submit">Registrar</Button>
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

export default AdvisorCoordinatorCreateModal