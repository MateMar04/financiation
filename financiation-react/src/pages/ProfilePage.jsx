import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ProfilePicture from "../components/ProfilePicture";
import ProfileData from "../components/ProfileData";
import "../assets/styles/ProfilePage.css";
import ProfileModifyForm from "../components/ProfileModifyForm";
import AuthContext from "../context/AuthContext";
import "../assets/styles/ProfileModifyForm.css";
import { getUser } from "../services/UserServices";
import { Avatar, Input, TextField } from "@mui/material";
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EditIcon from '@mui/icons-material/Edit';





const ProfilePage = () => {

    let [user, setUser] = useState()
    let { authTokens, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        getUser(authTokens.access).then(data => setUser(data))
    })


    return (

        <Container className="ContainerProfilePage">
            <EditIcon color='action' className="EditIconProfile"/>
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

            <Row className={"d-flex justify-content-center text-center py-3"}>
                <Col md={6}>

                    <TextField variant='outlined' label='Nombre' required className='profileTextField' defaultValue={user?.first_name} InputProps={{ sx: { borderRadius: 5} }}></TextField>

                </Col>
                <Col md={6}>

                    <TextField variant='outlined' label='Apellido' required className='profileTextField' defaultValue={user?.last_name} InputProps={{ sx: { borderRadius: 5 } }}></TextField>

                </Col>
            </Row>


            <Row className={"d-flex justify-content-center text-center py-3"}>
                <Col md={6}>

                    <TextField variant='outlined' label='CUIL' required className='profileTextField' defaultValue={user?.ssn} InputProps={{ sx: { borderRadius: 5 } }}></TextField>

                </Col>
                <Col md={6}>

                    <TextField variant='outlined' label='Telefono' required className='profileTextField' defaultValue={user?.phone_number} InputProps={{ sx: { borderRadius: 5 } }}></TextField>

                </Col>
            </Row>
            <Row className={"d-flex justify-content-center text-center py-3"}>
                <Col md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="Fecha de Nacimiento" className='profileTextField' InputProps={{ sx: { borderRadius: 5 } }} variant="outlined" />
                    </LocalizationProvider>


                </Col>
                <Col md={6}>

                    <TextField variant='outlined' label='Ciudad' className='profileTextField' InputProps={{ sx: { borderRadius: 5 } }}></TextField>

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Button className='BtnProfileCerrarSesion' onClick={logoutUser} sx={{my:3}}>Cerrar Sesion</Button>
                </Col>
            </Row>
            </Container>
        </Container >



    );
}


export default ProfilePage