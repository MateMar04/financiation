import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ProfilePicture from "../components/ProfilePicture";
import ProfileData from "../components/ProfileData";
import "../assets/styles/ProfilePage.css";
import ProfileModifyForm from "../components/ProfileModifyForm";
import AuthContext from "../context/AuthContext";
import "../assets/styles/ProfileModifyForm.css";
import { getUser } from "../services/UserServices";
import { Avatar, TextField } from "@mui/material";


const ProfilePage = () => {

    let [user, setUser] = useState()
    let { authTokens, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        getUser(authTokens.access).then(data => setUser(data))
    })


    return (

        <Container className="ContainerProfilePage">
            <Row className={'d-flex justify-content-center'}>
                <Col className="d-flex justify-content-center">
                            <Avatar src={user?.profile_picture} sx={{ width: 200, height: 200 }} className="ProfilePicture" />
                            </Col>
            </Row>

            <Row className={'justify-content-center text-center'}>
                <h1>{user?.first_name} {user?.last_name}</h1>
                <h3>Coordinador</h3>
            </Row>


            <Row className={"d-flex justify-content-center text-center"}>
                <Col md={6}>

                    <TextField variant='filled' label='Nombre' required className='InputsProfile' defaultValue={user?.first_name} sx={{ my: 3 }}></TextField>

                </Col>
                <Col md={6}>

                    <TextField variant='filled' label='Apellido' required className='InputsProfile' defaultValue={user?.last_name} sx={{ my: 3 }}></TextField>

                </Col>
            </Row>


            <Row className={"d-flex justify-content-center text-center"}>
                <Col md={6}>

                    <TextField variant='filled' label='Correo Electronico' required className='InputsProfile' defaultValue={user?.email} sx={{ my: 3 }}></TextField>

                </Col>
                <Col md={6}>

                    <TextField variant='filled' label='Fecha de Nacimiento' required className='InputsProfile' defaultValue={user?.last_name} sx={{ my: 3 }}></TextField>

                </Col>
            </Row>
        </Container >



    );
}


export default ProfilePage