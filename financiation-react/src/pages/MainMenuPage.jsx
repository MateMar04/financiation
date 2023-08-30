import {Col, Container, Row} from "react-bootstrap";
import "../assets/styles/MainMenuPage.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

export const MainMenuPage = () => {

    let {authTokens, logoutUser, myUser} = useContext(AuthContext)


    return (
        <Container fluid>
            <Row>
                <Col lg={4}>
                    <Card className="main-menu-card" id="left-card">
                        <Container fluid className="avatar_container">
                            <Avatar src={myUser?.profile_picture} className="profile_picture_avatar"/>
                        </Container>

                        <h1 className="name-title">{myUser?.first_name} {myUser?.last_name}</h1>

                        <Container>
                            <Container>
                                <h5 className="property-title">Estado:</h5>
                                <p>{myUser?.user_status}</p>

                            </Container>
                            <Container>
                                <h5 className="property-title">Rol:</h5>
                                <p>{myUser?.role}</p>
                            </Container>
                            <Container>
                                <h5 className="property-title">CUIL:</h5>
                                <p>{myUser?.ssn}</p>
                            </Container>
                        </Container>
                    </Card>
                    <Card className="main-menu-card" id="left-card">
                    <h1 className="name-title">Consultas resueltas en la ultima visita</h1>
                        <h1 className="name-title">53</h1>
                    </Card>

                </Col>

                <Col lg={4}>
                    <Card className="main-menu-card" id="center-card">
                        <Container fluid className="avatar_container">
                            <Avatar src={myUser?.profile_picture} className="profile_picture_avatar"/>
                        </Container>

                        <h1 className="name-title">{myUser?.first_name} {myUser?.last_name}</h1>

                        <Container>
                            <Container>
                                <h5 className="property-title">Estado:</h5>
                                <p>{myUser?.user_status}</p>

                            </Container>
                            <Container>
                                <h5 className="property-title">Rol:</h5>
                                <p>{myUser?.role}</p>
                            </Container>
                            <Container>
                                <h5 className="property-title">CUIL:</h5>
                                <p>{myUser?.ssn}</p>
                            </Container>
                        </Container>
                    </Card>
                    <Card className="main-menu-card" id="center-card">
                    <h1 className="name-title">Consultas resueltas en la ultima visita</h1>
                        <h1 className="name-title">53</h1>
                    </Card>

                </Col>

                <Col lg={4}>
                    <Card className="main-menu-card" id="right-card">
                        <Container fluid className="avatar_container">
                            <Avatar src={myUser?.profile_picture} className="profile_picture_avatar"/>
                        </Container>

                        <h1 className="name-title">{myUser?.first_name} {myUser?.last_name}</h1>

                        <Container>
                            <Container>
                                <h5 className="property-title">Estado:</h5>
                                <p>{myUser?.user_status}</p>

                            </Container>
                            <Container>
                                <h5 className="property-title">Rol:</h5>
                                <p>{myUser?.role}</p>
                            </Container>
                            <Container>
                                <h5 className="property-title">CUIL:</h5>
                                <p>{myUser?.ssn}</p>
                            </Container>
                        </Container>
                    </Card>
                    <Card className="main-menu-card" id="right-card">
                    <h1 className="name-title">Consultas resueltas en la ultima visita</h1>
                        <h1 className="name-title">53</h1>
                    </Card>

                </Col>

            </Row>


        </Container>
    )
}