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

const EditPhotoPage = () => {

    return (
    
            <Container className="ContainerProfilePage">
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
            </Container>

    );
}


export default EditPhotoPage