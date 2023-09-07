import { Col, Container, Row } from "react-bootstrap";
import "../assets/styles/MainMenuPage.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import VisitCardMainMenu from "../components/VisitCardMainMenu";
import PieChart from "../components/PieChart";

export const MainMenuPage = () => {

    let { authTokens, logoutUser, myUser } = useContext(AuthContext)


    return (
        <Container fluid className="main-menu-container">
            <Row>
                <Col lg={4}>
                    <Card className="main-menu-card profile-card" id="left-card">
                        <Container fluid className="avatar_container">
                            <Avatar src={myUser?.profile_picture} className="profile_picture_avatar" />
                        </Container>

                        <h1 className="name-title">{myUser?.first_name} {myUser?.last_name}</h1>

                        <Container>
                            <Container className="property-container">
                                <h5 className="property-title">Estado:</h5>
                                <p className="text-main-menu">{myUser?.user_status}</p>

                            </Container>
                            <Container className="property-container">
                                <h5 className="property-title">Rol:</h5>
                                <p className="text-main-menu">{myUser?.role}</p>
                            </Container>
                            <Container className="property-container">
                                <h5 className="property-title">CUIL:</h5>
                                <p className="text-main-menu">{myUser?.ssn}</p>
                            </Container>
                        </Container>
                    </Card>

                    <Card className="main-menu-card last-requests-card" id="left-card">
                        <Container className="padding-title">
                            <Row className="text-center">
                                <h4>Consultas resueltas en la ultima visita:</h4>
                            </Row>
                            <Row className="text-center">
                                <h3 className="fw-bold">53</h3>
                            </Row>
                            </Container>
                    </Card>

                </Col>

                <Col lg={4}>
                    <Card className="main-menu-card visit-card" id="center-card">

                        <h1 className="name-title">Proximas Visitas</h1>

                        <Container>
                            <VisitCardMainMenu />
                            <VisitCardMainMenu />
                            <VisitCardMainMenu />
                            <VisitCardMainMenu />
                            <VisitCardMainMenu />
                            <VisitCardMainMenu />
                            <VisitCardMainMenu />                            
                            <VisitCardMainMenu />
                            <VisitCardMainMenu />
                            
                           
                        </Container>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className="main-menu-card group-card-main-menu" id="right-card">
                        <h1 className="name-title">Grupo 1</h1>
                        <Row className="">
                            <Col lg={6}>
                                <h5 className="property-title ">Mateo Marchisone</h5>
                            </Col>
                            <Col lg={6}>
                                <p className="text-main-menu">Coordinador</p>
                            </Col>
                        </Row>


                    </Card>
                    <Card className="main-menu-card report-card-main-menu" id="right-card">
                        <h1 className="name-title ">Reportes</h1>
                        <Container>
                            <PieChart chartData={{
                                labels: ["Pedro", "Maria", "Juan"],
                                datasets: [{
                                    label: "",
                                    data: [30, 30, 40],
                                    backgroundColor: ["red", "green", "blue"]
                                }]
                            }} />
                        </Container>

                    </Card>

                </Col>

            </Row>


        </Container>
    )
}