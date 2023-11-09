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

export const EditPhotoPage = () => {

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
    
            <Container className="ContainerProfilePage">
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Avatar alt="Remy Sharp" src={'data:image/png;base64, ' + myUser?.profile_picture}
                                sx={{width: 200, height: 200}} className="ProfilePicture"/>
                    </Col>
                </Row>
            </Container>

    );
}

