import React, {useContext, useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import ProfilePicture from "../components/ProfilePicture";
import ProfileData from "../components/ProfileData";
import "../assets/styles/ProfilePage.css"
import ProfileModifyForm from "../components/ProfileModifyForm";
import AuthContext from "../context/AuthContext";

const ProfilePage = () => {

    let [user, setUser] = useState()
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        getUser()
    })

    let getUser = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch(`/auth/users/me`, {headers: headers})
        let data = await response.json()
        console.log(data)
        if (response.status === 200) {
            setUser(data)
        } else if (response.statusText === 'Unauthorized') {
            logoutUser()
        }
    }

    return (
        <Container fluid>
            <Card>
                <Row>
                    <Col lg={4}>
                        <ProfilePicture profileImg={user?.profile_picture} username={user?.username}/>
                        {/* Falta añadir icono para editar imagen */}
                    </Col>
                    <Col lg={8}>
                        <ProfileData username={user?.username} firstName={user?.first_name} lastName={user?.last_name}
                                     email={user?.email} ssn={user?.ssn}
                                     phone_number={user?.phone_number}/>
                    </Col>
                </Row>
            </Card>

            <Container>
                <ProfileModifyForm/>
            </Container>
        </Container>
    );
}


export default ProfilePage