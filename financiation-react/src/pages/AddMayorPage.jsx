import { Button, Form,Row } from "react-bootstrap";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SucceedModal } from "../components/SucceedModal"
import FailedModal from "../components/FailedModal";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Container, Card } from 'react-bootstrap';
import '../assets/styles/AddMayorPage.css';
import PhoneIcon from '@mui/icons-material/Phone';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

export const AddMayorPage = () => {

    let { authTokens } = useContext(AuthContext)
    let history = useNavigate()
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    let postAdvised = async (e) => {
        e.preventDefault()
        let response = await fetch(' /api/advisees', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "first_name": e.target.first_name.value,
                "last_name": e.target.last_name.value,
                "ssn": e.target.ssn.value
            })
        })
        if (response.status === 200) {
            toggleModalsucceed();
            await postAdvised()
        } else if (response.status == 500) {
            toggleModalfailed();
            await postAdvised()
        } else if (response.status == 401) {
            toggleModalfailed();
            await postAdvised()
        } else if (response.status == 400) {
            toggleModalfailed();
            await postAdvised()
        }
    }

    return (
        <Container className="container-addmayor">
            <Form onSubmit={postAdvised} className="FormAddMayor" >

                <h3 className={'h3LoginPage'}>Ingresar Intendente</h3>

                <SucceedModal message="la visita" show={showsuccess} />
                <FailedModal message="la visita" show={showfail} />

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Form.Group style={{ textAlign: 'center', marginRight: '10px' }}>
                        <TextField
                            className="inputNombre"
                            label="Nombre"
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
                    <Form.Group style={{ textAlign: 'center' }}>
                        <TextField
                            className="inputNombre"
                            label="Apellido"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleOutlinedIcon />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 6, borderColor: '#f4f4f4' },
                            }}
                        />
                    </Form.Group>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Form.Group style={{ textAlign: 'center', marginRight: '10px' }}>
                        <TextField
                            className="inputNombre"
                            label="Telefono"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon/> 
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 6, borderColor: '#f4f4f4' },
                            }}
                        />
                    </Form.Group>
                    <Form.Group style={{ textAlign: 'center' }}>
                        <TextField
                            className="inputNombre"
                            label="Email"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleOutlinedIcon />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 6, borderColor: '#f4f4f4' },
                            }}
                        />
                    </Form.Group>
                </div>

                <Row className={'justify-content-center text-center'}>
                    <Button type="submit" className="BtnIniciarSesionLogin">Registrar Intendente</Button>
                </Row>
            </Form>
        </Container>

    )

}