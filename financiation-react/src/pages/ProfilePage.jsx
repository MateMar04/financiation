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





const ProfilePage = () => {

    let [user, setUser] = useState()
    let { authTokens, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        getUser(authTokens.access).then(data => setUser(data))
    })


    return (

        <Container className="ContainerProfilePage">
            <Row>
                <Col className="d-flex justify-content-center">
                    <Avatar src={user?.profile_picture} sx={{ width: 200, height: 200 }} className="ProfilePicture" />
                </Col>
            </Row>

            <Row className={'justify-content-center text-center'}>
                <h1 className="ProfileText">{user?.first_name} {user?.last_name}</h1>
                <h3 className="ProfileText">Coordinador</h3>
            </Row>


            <Row className={"d-flex justify-content-center text-center"}>
                <Col md={6}>

                    <TextField variant='standard' label='Nombre' required className='profileTextField' defaultValue={user?.first_name} sx={{ my: 3 }}></TextField>

                </Col>
                <Col md={6}>

                    <TextField variant='standard' label='Apellido' required className='profileTextField' defaultValue={user?.last_name} sx={{ my: 3 }}></TextField>

                </Col>
            </Row>


            <Row className={"d-flex justify-content-center text-center"}>
                <Col md={6}>

                    <TextField variant='standard' label='CUIL' required className='profileTextField' defaultValue={user?.cuil} sx={{ my: 3 }}></TextField>

                </Col>
                <Col md={6}>

                    <TextField variant='standard' label='Telefono' required className='profileTextField' defaultValue={user?.phone} sx={{ my: 3 }}></TextField>

                </Col>
            </Row>
            <Row className={"d-flex justify-content-center text-center"}>
                <Col md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="Fecha de Nacimiento" className='profileTextField' sx={{ my: 3 }} variant="standard" />
                    </LocalizationProvider>


                </Col>
                <Col md={6}>

                    <TextField variant='standard' label='Ciudad' className='profileTextField' defaultValue={user?.last_name} sx={{ my: 3 }}></TextField>

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Button className='BtnProfileCerrarSesion' onClick={logoutUser}>Cerrar Sesion</Button>
                </Col>
            </Row>
        </Container >



    );
}


export default ProfilePage