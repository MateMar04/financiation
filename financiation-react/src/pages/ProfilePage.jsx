import React, {useContext, useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import "../assets/styles/ProfilePage.css";
import AuthContext from "../context/AuthContext";
import {getUser} from "../services/UserServices";
import {Avatar, TextField} from "@mui/material";
import {DateField} from '@mui/x-date-pickers/DateField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {ProfilePicture} from "../components/ProfilePicture"
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';



const ProfilePage = () => {

    let [user, setUser] = useState()
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        getUser(authTokens.access).then(data => setUser(data));
    }, );

    const [showButton, setShowButton] = useState(false);
    const [showLogoutButton, setShowLogoutButton] = useState(true);
    let [editMode, setEditMode] = useState(false);
    const defaultFirstName = user?.first_name || '';
    const defaultLastName = user?.last_name || '';
    const defaultSSN = user?.ssn || '';
    const defaultPhoneNumber = user?.phone_number || '';


    const handleAddButton = () => {
        setShowButton(!showButton);
        setShowLogoutButton(!showLogoutButton);
        setEditMode(!editMode);

    };


    return (
        
        <Container className="ContainerProfilePage">
            <Row>
                <Col className="d-flex justify-content-center">
                    {/* <Avatar src={user?.profile_picture} sx={{width: 200, height: 200}} className="ProfilePicture"/> */}
                    <ProfilePicture/>
                </Col>

            </Row>
            <IconButton className="EditIconProfile" onClick={handleAddButton}><EditIcon color='action' sx={{
                width: 25,
                height: 25
            }}/></IconButton>
            


            <Row className={'justify-content-center text-center'}>
                <h1 className="ProfileText">{user?.first_name} {user?.last_name}</h1>
                <h3 className="ProfileText">Coordinador</h3>
            </Row>

            <Container className="InputsProfile">

                <Row className={"d-flex justify-content-center text-center"}>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='Nombre' required className='profileTextField'
                                   value={defaultFirstName} InputProps={{
                            sx: {borderRadius: 5},
                            readOnly: !editMode
                        }}></TextField>

                    </Col>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='Apellido' required className='profileTextField'
                                   value={defaultLastName} InputProps={{
                            sx: {borderRadius: 5},
                            readOnly: !editMode
                        }}></TextField>

                    </Col>
                </Row>


                <Row className={"d-flex justify-content-center text-center"}>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='CUIL' required className='profileTextField'
                                   value={defaultSSN} InputProps={{
                            sx: {borderRadius: 5},
                            readOnly: !editMode
                        }}></TextField>

                    </Col>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='Telefono' required className='profileTextField'
                                   value={defaultPhoneNumber} InputProps={{
                            sx: {borderRadius: 5},
                            readOnly: !editMode
                        }}></TextField>

                    </Col>
                </Row>
                <Row className={"d-flex justify-content-center text-center"}>
                    <Col md={6} xs={12} className="py-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField label="Fecha de Nacimiento" className='profileTextField' InputProps={{
                                sx: {borderRadius: 5},
                                readOnly: !editMode
                            }} variant="outlined"/>
                        </LocalizationProvider>


                    </Col>
                    <Col md={6} className="py-3">

                        <TextField variant='outlined' label='Ciudad' className='profileTextField' InputProps={{
                            sx: {borderRadius: 5},
                            readOnly: !editMode
                        }}></TextField>

                    </Col>
                </Row>
                <Row>

                    {showButton && (
                        <Col className="d-flex justify-content-center py-3">
                            <Button className="CancelarBtnProfile" onClick={handleAddButton}>Cancelar</Button>
                        </Col>
                    )}

                    {showLogoutButton && (
                        <Col className="d-flex justify-content-center py-3">
                            <Button className='BtnProfileCerrarSesion' onClick={logoutUser} sx={{my: 3}}>Cerrar
                                Sesion</Button>
                        </Col>
                    )}

                    {showButton && (
                        <Col className="d-flex justify-content-center py-3">
                            <Button className="GuardarBtnProfile">Guardar</Button>
                        </Col>
                    )}
                </Row>
            </Container>
        </Container>


    );
}


export default ProfilePage