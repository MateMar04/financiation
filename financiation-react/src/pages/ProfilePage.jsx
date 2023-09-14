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

    let {authTokens, logoutUser} = useContext(AuthContext)

    const [myUser, setMyUser] = useState()

    const [showButton, setShowButton] = useState(false);
    const [showLogoutButton, setShowLogoutButton] = useState(true);
    let [editMode, setEditMode] = useState(false);


    const loadData = async () => {
        const usuario = await getUser(authTokens.access)
        setMyUser(usuario)
    }

    useEffect(() => {
        loadData()

    }, []);

    const handleAddButton = () => {
        setShowButton(!showButton);
        setShowLogoutButton(!showLogoutButton);
        setEditMode(!editMode);
    };


    return (
        <Container className="ContainerProfilePage">
            <Row>
                <Col className="d-flex justify-content-center">
                    <IconButton className="EditIconProfile" onClick={handleAddButton}>
                        <EditIcon color='action' sx={{width: 25, height: 25}}/>
                    </IconButton>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Avatar alt="Remy Sharp" src={'data:image/png;base64, ' + myUser?.profile_picture}
                            sx={{width: 200, height: 200}} className="ProfilePicture"/>
                </Col>
            </Row>
            {showButton && (
                <Row className={'justify-content-center text-center'}>
                    <ProfilePicture/>
                </Row>
            )}
            <Row className={'justify-content-center text-center'}>
                <h1 className="ProfileText">{myUser?.first_name} {myUser?.last_name}</h1>
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
                    {showLogoutButton && (
                        <Col className="d-flex justify-content-center py-3">
                            <Button className='BtnProfileCerrarSesion' onClick={logoutUser} sx={{my: 3}}>Cerrar
                                Sesion</Button>
                        </Col>
                    )}
                </Row>
            </Container>
        </Container>


    )
        ;
}


export default ProfilePage