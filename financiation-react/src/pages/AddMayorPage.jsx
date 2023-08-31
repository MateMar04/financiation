import {Button, Form} from "react-bootstrap";
import React, {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {SucceedModal} from "../components/SucceedModal"
import FailedModal from "../components/FailedModal";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {Container,Card} from 'react-bootstrap'
import '../assets/styles/AddMayorPage.css'
 

export const AddMayorPage = () => {

    let {authTokens} = useContext(AuthContext)
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
            //alert('no se a registrado la visita (Uno de los datos ingresados no coincide con la base de datos)')
            await postAdvised()
        } else if (response.status == 401) {
            toggleModalfailed();
            //alert('no se a registrado la visita (Desautorizado)')
            await postAdvised()
        } else if (response.status == 400) {
            toggleModalfailed();
            //alert('no se a registrado la visita (Bad request)')
            await postAdvised()
        }
    }

    return (
        <Container className="container-addmayor">  
        <Form onSubmit={postAdvised} className="FormAddMayor" >
            
            <h3 className={'h3LoginPage'}>Ingresar Intendente</h3>
    
            <SucceedModal message="la visita" show={showsuccess}/>
            <FailedModal message="la visita" show={showfail}/>
    
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
    
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="submit">Registrar</Button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Button variant="outlined" color="primary">
                    Cancelar
                </Button>
                <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                    Borrar
                </Button>
            </div>
        </Form>
        </Container>
        
    )
    
}