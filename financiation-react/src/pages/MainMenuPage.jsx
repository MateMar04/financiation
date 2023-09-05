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
                    <Card className="profile-card d-flex align-items-center" id="left-card">
                        <Container>
                            <Row >
                                <Col className="d-flex justify-content-center">
                                    <Avatar src={myUser?.profile_picture} sx={{ width: 128, height: 128 }} />
                                </Col>
                            </Row>

                            <Row className="text-center">
                                <strong>
                                    <h3>{myUser?.first_name} {myUser?.last_name}</h3>
                                </strong>
                            </Row>

                            <Container className="last-text-main-menu-card">
                                <Row>
                                    <strong>
                                        <p className="p-main-menu-card">Estado:</p>
                                    </strong>
                                </Row>
                                <Row>
                                    <p className="p-main-menu-card">{myUser?.user_status}</p>
                                </Row>
                                <Row>
                                    <strong>
                                        <p className="p-main-menu-card">Rol:</p>
                                    </strong>
                                </Row>
                                <Row>
                                    <p className="p-main-menu-card">{myUser?.role}</p>
                                </Row>
                                <Row>
                                    <strong>
                                        <p className="p-main-menu-card">Cuil:</p>
                                    </strong>
                                </Row>
                                <p className="p-main-menu-card">{myUser?.ssn}</p>

                            </Container>
                        </Container>
                    </Card>

                    <Card className="last-visits-card border d-flex align-items-center" id="left-card">
                        <Container className="">
                            <Row className="text-center first-row-main-menu-card">
                                <h4>Consultas resueltas en la ultima visita:</h4>
                            </Row>
                            <Row className="text-center">
                                <h3 className="fw-bold">53</h3>
                            </Row>
                        </Container>
                    </Card>

                </Col>

                <Col lg={4}>
                    <Card className="next-visits-card" id="center-card">
                        <Row className="text-center">
                            <h2 className="name-title">Próximas Visitas</h2>
                        </Row>

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

            </Row >


        </Container >
    )
}