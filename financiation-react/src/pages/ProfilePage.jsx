import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import ProfilePicture from "../components/ProfilePicture";
import ProfileData from "../components/ProfileData";
import "../assets/styles/ProfilePage.css";
import ProfileModifyForm from "../components/ProfileModifyForm";
import AuthContext from "../context/AuthContext";
import "../assets/styles/ProfileModifyForm.css";
import {getUser} from "../services/UserServices";


const ProfilePage = () => {

    let [user, setUser] = useState()
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        getUser()
    })


    return (
        <Container fluid>
            <Card className="ProfileCard">
                <Row>
                    <Col lg={4}>
                        <ProfilePicture profileImg={user?.profile_picture} username={user?.username}/>
                        {/* Falta añadir icono para editar imagen */}
                        {/* Deberia cambiarse el img por un avatar */}

                    </Col>
                    <Col lg={8}>
                        <ProfileData username={user?.username} firstName={user?.first_name} lastName={user?.last_name}
                                     email={user?.email} ssn={user?.ssn}
                                     phone_number={user?.phone_number}/>
                    </Col>
                </Row>
                <ProfileModifyForm/>
            </Card>

           
        </Container>
    );
}


export default ProfilePage