import React, {useContext, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
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
import {EditOutlined} from "@ant-design/icons";
import {Popover, Select} from 'antd';
import {Divider} from 'antd';
import {Input} from 'antd';
import {DatePicker} from 'antd';
import {getLocations} from "../services/LocationServices";
import {Button} from 'antd';


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
    const [locations, setLocations] = useState()
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);


    const handleUserSelection = (e) => {
        const selectedUserId = e.target.value;
        const selecteduser = myUser.find((myUser) => myUser.id === parseInt(selectedUserId, 10));
        setEditedUser(selecteduser);
    };

    useEffect(() => {
        getUser(authTokens.access).then(data => setMyUser(data))
        getLocations(authTokens.access).then(data => setLocations(data))
    }, []);
    const handleAddButton = () => {
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
                "phone_number": editedUser.phone_number,
            })
        })

        if (response.status === 200) {
            toggleModalsucceed();
            setMyUser({
                ...myUser,
                first_name: editedUser.first_name,
                last_name: editedUser.last_name,
                phone_number: editedUser.phone_number,
            });
        } else if (response.status === 500) {
            toggleModalfailed();
        } else if (response.status === 401) {
            toggleModalfailed();
        } else if (response.status === 400) {
            toggleModalfailed();
        }
    }
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const getItemNames = (array) => {
        return array?.map(item => ({
            label: item.name,
            value: item.id
        }));
    }

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


    return (
        <form onSubmit={(e) => handleFormSubmit(e)}>
            <Container className="ContainerProfilePage">
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Avatar alt="Remy Sharp" src={'data:image/png;base64, ' + myUser?.profile_picture}
                                sx={{width: 200, height: 200}} className="ProfilePicture"/>
                    </Col>
                </Row>


                <Row className={'d-flex justify-content-end'}>
                    <Col>
                        <h3 className={'ImportantTextProfile'}>Información básica</h3>
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        <Popover content="¿Desea editar el perfil?">
                            <EditOutlined className={'IconEdit'} onClick={handleAddButton}/>
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
                                       onChange={(e) => setEditedUser({...editedUser, first_name: e.target.value})}
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
                                       onChange={(e) => setEditedUser({...editedUser, last_name: e.target.value})}
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
                                       onChange={(e) => setEditedUser({...editedUser, phone_number: e.target.value})}
                                       required className={'InputsProfile'} size="large"/>
                            </>
                            :
                            <>
                                <a>Teléfono</a>
                                <h5>{defaultPhoneNumber}</h5>

                            </>

                        }
                        <Divider/>
                        {editMode ?
                            <>
                                <a>Fecha de Nacimiento</a>
                                <DatePicker format={dateFormatList} placeholder={'Fecha de Nacimiento'}
                                            className={'InputsProfile'} size="large"/>
                            </>
                            :
                            <>
                                <a>Fecha de Nacimiento</a>
                                <h5>28 de enero de 2005 #esto es texto#</h5>
                            </>
                        }
                        <Divider/>
                        {editMode ?
                            <>
                                <a>Ciudad</a>
                                <Select placeholder={"Ciudad"}
                                        options={getItemNames(locations)}
                                        showSearch
                                        filterOption={filterOption}
                                        className={'InputsProfile'}
                                        size="large"
                                />

                            </>
                            :
                            <>
                                <a>Ciudad</a>
                                <h5>Calamuchita #esto es texto#</h5>
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
                                <Col md={4}>
                                    <Button className={'CancelarBtnProfile'} onClick={handleAddButton}>Cancelar</Button>
                                </Col>
                                <Col md={4}>
                                    <Button className={'GuardarBtnProfile'} type='submit'>Actualizar
                                        Datos</Button>
                                </Col>


                            </>
                        }
                    </Row>

                </Container>
            </Container>
        </form>
    )
        ;
}


export default ProfilePage