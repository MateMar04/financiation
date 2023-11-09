import React, {useContext, useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import "../assets/styles/ProfilePage.css";
import AuthContext from "../context/AuthContext";
import {Avatar, TextField} from "@mui/material";
import {DateField} from '@mui/x-date-pickers/DateField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {ProfilePicture} from "../components/ProfilePicture"
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {getUser} from "../services/UserServices";
import { Link } from "react-router-dom";

const ProfilePage = () => {

    let {authTokens, logoutUser, user} = useContext(AuthContext)

    const [showButton, setShowButton] = useState(false);
    const [showLogoutButton, setShowLogoutButton] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [myUser, setMyUser] = useState()
    const defaultFirstName = myUser?.first_name || '';
    const defaultLastName = myUser?.last_name || '';
    const defaultSSN = myUser?.ssn || '';
    const defaultPhoneNumber = myUser?.phone_number || '';
    const [editedUser, setEditedUser] = useState({});
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const [editProfilePicture, setEditProfilePicture] = useState(false);


    const handleUserSelection = (e) => {
        const selectedUserId = e.target.value;
        const selecteduser = myUser.find((myUser) => myUser.id === parseInt(selectedUserId, 10));
        setEditedUser(selecteduser);
    };
    const getData = async () => {
        const usuario = await getUser(authTokens.access)
        setMyUser(usuario)
    }
    useEffect(() => {
        getUser(authTokens.access).then(data => setMyUser(data))
        getData()
    }, []);

  

    
    const handleAddButton = () => {
        setShowButton(!showButton);
        setShowLogoutButton(!showLogoutButton);
        setEditMode(!editMode);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        putUser();
    };
    let putUser = async () => {

        let response = await fetch(`/api/users/put/${myUser?.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "first_name": editedUser.first_name,
                "last_name": editedUser.last_name,
                "phone_number":editedUser.phone_number,
            })
        })

        if (response.status === 200) {
            toggleModalsucceed();
            setMyUser({
                ...myUser,
                first_name: editedUser.first_name,
                last_name: editedUser.last_name,
                phone_number:editedUser.phone_number,
            });
        } else if (response.status === 500) {
            toggleModalfailed();
        } else if (response.status === 401) {
            toggleModalfailed();
        } else if (response.status === 400) {
            toggleModalfailed();
        }
    }

    return (
        <form onSubmit={(e) => handleFormSubmit(e)}>
            <Container className="ContainerProfilePage">
            <Row>
                <Link to={'/editphoto'}>
                    <Button>Editar foto</Button>
                    </Link>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <IconButton className="EditIconProfile" onClick={handleAddButton}>
                            <EditIcon color='action' sx={{width: 25, height: 25}} />
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
                        <ProfilePicture editProfilePicture={editProfilePicture} />
                    </Row>
                )}


                <Row className={'justify-content-center text-center'}>
                    <h1 className="ProfileText">{myUser?.first_name} {myUser?.last_name}</h1>
                    <h3 className="ProfileText">Coordinador</h3>
                </Row>
                    
                <Container className="InputsProfile">

                    <Row className={"d-flex justify-content-center text-center"}>
                        <Col md={6} className="py-3">

                            {editMode ?
                                <TextField variant='outlined' label='Nombre' required className='profileTextField'
                                           defaultValue={defaultFirstName}
                                           onChange={(e) => setEditedUser({...editedUser, first_name: e.target.value})}
                                           InputProps={{
                                    sx: {borderRadius: 5},
                                    readOnly: false
                                }}></TextField> :
                                <TextField variant='outlined' label='Nombre' required className='profileTextField'
                                           value={defaultFirstName}
                                           onChange={(e) => setEditedUser({...editedUser, first_name: e.target.value})}
                                           InputProps={{
                                    sx: {borderRadius: 5},
                                    readOnly: true
                                }}></TextField>
                            }


                        </Col>
                        <Col md={6} className="py-3">
                            {editMode ?
                                <TextField variant='outlined' label='Apellido' required className='profileTextField'
                                           defaultValue={defaultLastName}
                                           onChange={(e) => setEditedUser({...editedUser, last_name: e.target.value})}
                                           InputProps={{
                                               sx: {borderRadius: 5},
                                               readOnly: false
                                           }}></TextField> :
                                <TextField variant='outlined' label='Apellido' required className='profileTextField'
                                           value={defaultLastName}
                                           onChange={(e) => setEditedUser({...editedUser, last_name: e.target.value})}
                                           InputProps={{
                                               sx: {borderRadius: 5},
                                               readOnly: true
                                           }}></TextField>
                            }
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
                            {editMode ?
                                <TextField variant='outlined' label='Teléfono' required className='profileTextField'
                                           defaultValue={defaultPhoneNumber}
                                           onChange={(e) => setEditedUser({...editedUser, phone_number: e.target.value})}
                                           InputProps={{
                                               sx: {borderRadius: 5},
                                               readOnly: false
                                           }}></TextField> :
                                <TextField variant='outlined' label='Teléfono' required className='profileTextField'
                                           value={defaultPhoneNumber}
                                           onChange={(e) => setEditedUser({...editedUser, phone_number: e.target.value})}
                                           InputProps={{
                                               sx: {borderRadius: 5},
                                               readOnly: true
                                           }}></TextField>
                            }
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

                            <TextField variant='outlined' label='Ciudad' className='profileTextField'
                                       InputProps={{
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
                    <div className='btnactualizar'>
                        <Button className='BtnIniciarSesionLogin btninedit' type='submit'>Actualizar</Button>
                    </div>
                </Container>
            </Container>
        </form>
    );
}


export default ProfilePage