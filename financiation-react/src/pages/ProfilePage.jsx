import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../assets/styles/ProfilePage.css";
import AuthContext from "../context/AuthContext";
import { getUser } from "../services/UserServices";
import { Avatar, TextField } from "@mui/material";
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


const ProfilePage = () => {

    let [user, setUser] = useState()
    let { authTokens, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        getUser(authTokens.access).then(data => setUser(data))
    })

    const [showButton, setShowButton] = useState(false);
    const [showLogoutButton, setShowLogoutButton] = useState(true);



    const handleAddButton = () => {
        setShowButton(!showButton);
        setShowLogoutButton(!showLogoutButton);

    };


    return (
        <Container className="ContainerProfilePage">
            <IconButton className="EditIconProfile" onClick={handleAddButton}><EditIcon color='action' sx={{ width: 25, height: 25 }} /></IconButton>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Avatar src={user?.profile_picture} sx={{ width: 200, height: 200 }} className="ProfilePicture" />
                </Col>

            </Row>


            <Row className={'justify-content-center text-center'}>
                <h1 className="ProfileText">{user?.first_name} {user?.last_name}</h1>
                <h3 className="ProfileText">Coordinador</h3>
            </Row>

            <Container className="InputsProfile">

                <Row className={"d-flex justify-content-center text-center"}>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='Nombre' required className='profileTextField' defaultValue={user?.first_name} InputProps={{ sx: { borderRadius: 5 } }}></TextField>

                    </Col>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='Apellido' required className='profileTextField' defaultValue={user?.last_name} InputProps={{ sx: { borderRadius: 5 } }}></TextField>

                    </Col>
                </Row>


                <Row className={"d-flex justify-content-center text-center"}>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='CUIL' required className='profileTextField' defaultValue={user?.ssn} InputProps={{ sx: { borderRadius: 5 } }}></TextField>

                    </Col>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='Telefono' required className='profileTextField' defaultValue={user?.phone_number} InputProps={{ sx: { borderRadius: 5 } }}></TextField>

                    </Col>
                </Row>
                <Row className={"d-flex justify-content-center text-center"}>
                    <Col md={6} xs={12} className="py-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField label="Fecha de Nacimiento" className='profileTextField' InputProps={{ sx: { borderRadius: 5 } }} variant="outlined" />
                        </LocalizationProvider>


                    </Col>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='Ciudad' className='profileTextField' InputProps={{ sx: { borderRadius: 5 } }}></TextField>

                    </Col>
                </Row>
                <Row>

                    {showButton &&(
                        <Col className="d-flex justify-content-center py-3">
                            <Button className="CancelarBtnProfile" onClick={handleAddButton}>Cancelar</Button>
                        </Col>
                    )}

                    {showLogoutButton && (
                        <Col className="d-flex justify-content-center py-3">
                            <Button className='BtnProfileCerrarSesion' onClick={logoutUser} sx={{ my: 3 }}>Cerrar Sesion</Button>
                        </Col>
                    )}

                    {showButton &&(
                        <Col className="d-flex justify-content-center py-3">
                            <Button className="GuardarBtnProfile">Guardar</Button>
                        </Col>
                    )}
                </Row>
            </Container>
        </Container >



    );
}


export default ProfilePage