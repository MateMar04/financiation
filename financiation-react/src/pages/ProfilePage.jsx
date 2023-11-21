import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/styles/ProfilePage.css";
import AuthContext from "../context/AuthContext";
import { Avatar, TextField } from "@mui/material";
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ProfilePicture } from "../components/ProfilePicture"
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { getUser } from "../services/UserServices";
import { Link } from "react-router-dom";

import { EditOutlined } from "@ant-design/icons";
import { Popover, Select } from 'antd';
import { Divider } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import { getLocations } from "../services/LocationServices";
import { Button } from 'antd';
const ProfilePage = () => {

    let { authTokens, logoutUser, user } = useContext(AuthContext)

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
    const [editedFirstName, setEditedFirstName] = useState(defaultFirstName);
    const [editedLastName, setEditedLastName] = useState(defaultLastName);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(defaultPhoneNumber);

    const getData = async () => {
        const usuario = await getUser(authTokens.access)
        setMyUser(usuario)
    }
    useEffect(() => {
        getUser(authTokens.access).then(data => setMyUser(data))
        getData()
    }, []);


    const handleAddButton = () => {
        setShowLogoutButton(!showLogoutButton);
        setEditMode(!editMode);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        putUser();
        setShowLogoutButton(!showLogoutButton);
        setEditMode(!editMode);
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
                "first_name": editedFirstName.first_name || myUser?.first_name,
                "last_name": editedLastName.last_name || myUser?.last_name,
                "phone_number": editedPhoneNumber.phone_number || myUser?.phone_number,
            })
        })

        if (response.status === 200) {
            toggleModalsucceed();
            setMyUser({
                ...myUser,
                first_name: editedFirstName.first_name || myUser?.first_name,
                last_name: editedLastName.last_name || myUser?.last_name,
                phone_number: editedPhoneNumber.phone_number || myUser?.phone_number
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

                <Row className="text-center">

                </Row>

                <Row>
                    <Col className="d-flex justify-content-center">
                    <Popover content="Editar foto de perfil >">
                    <Link to={'/editphoto'}>
                        <Avatar alt="Remy Sharp" src={'data:image/png;base64, ' + myUser?.profile_picture}
                            sx={{ width: 180, height: 180 }} className="ProfilePicture" />
                            </Link>
                            </Popover>
                    </Col>
                </Row>

                <Row className="text-center">
                    <h4 className=""> Bienvenido, {myUser?.first_name} {myUser?.last_name} </h4>
                </Row>

                <Row className="text-center">
                    <p className={'WelcomeUser'}>Aquí encontraras información personal y podrás modificarla. </p>
                </Row>


                <Row className={'d-flex justify-content-end'}>
                    <Col>
                        <h3 className={'ImportantTextProfile'}>Información básica</h3>
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        <Popover content="¿Desea editar los datos?">
                            <EditOutlined className={'IconEdit'} onClick={handleAddButton} />
                        </Popover>
                    </Col>
                </Row>

                <Container>
                    <Row className={'InfoProfile'}>
                        <Divider/>
                        {editMode ?
                            <>
                                <a>Nombre</a>
                                <Input placeholder="Nombre" defaultValue={defaultFirstName}
                                       onChange={(e) => setEditedFirstName({
                                        ...editedFirstName,
                                        first_name: e.target.value
                                    })}
                                       required className={'InputsProfile'} size="large"/>

                            </>
                            :
                            <>
                                <a>Nombre</a>
                                <h5>{defaultFirstName}</h5>
                            </>
                        }
                        <Divider/>
                        {editMode ?
                            <>
                                <a>Apellido</a>
                                <Input placeholder={"Apellido"} defaultValue={defaultLastName}
                                       onChange={(e) => setEditedLastName({...editedLastName, last_name: e.target.value})}
                                       required className={'InputsProfile'} size="large"/>
                            </>
                            :
                            <>
                                <a>Apellido</a>
                                <h5>{defaultLastName}</h5>
                            </>
                        }
                        <Divider/>
                        <>
                            <a>CUIL</a>
                            <h5>{defaultSSN}</h5>
                        </>
                        <Divider/>
                    </Row>


                    <Row>
                        <h3 className={'ImportantTextProfile'}>Información adicional</h3>
                    </Row>

                    <Row className={'InfoProfile'}>
                        <Divider/>
                        {editMode ?
                            <>
                                <a>Teléfono</a>
                                <Input placeholder="Teléfono" defaultValue={defaultPhoneNumber}
                                       onChange={(e) => setEditedPhoneNumber({...editedPhoneNumber, phone_number: e.target.value})}
                                       required className={'InputsProfile'} size="large"/>
                            </>
                            :
                            <>
                                <a>Teléfono</a>
                                <h5>{defaultPhoneNumber}</h5>

                            </>

                        }
                        <Divider/>  
            
                    </Row>

                    <Row className={'justify-content-center'}>
                        {showLogoutButton ?
                            <>
                                <Button type="primary" danger onClick={logoutUser} className='BtnProfileCerrarSesion'>
                                    Cerrar sesión
                                </Button>
                            </>
                            :
                            <>

                                <Col md={4} xs={6}>
                                    <Button className={'CancelarBtnProfile'} onClick={handleAddButton}>Cancelar</Button>
                                </Col>
                                <Col md={4} xs={6}>
                                    <Button className={'GuardarBtnProfile'} onClick={handleFormSubmit}>Actualizar
                                        Datos</Button>
                                </Col>

                            </>
                        }

                    </Row>
                </Container>
            </Container>
        </form>
    );
}


export default ProfilePage