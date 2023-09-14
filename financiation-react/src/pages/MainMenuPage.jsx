import {Col, Container, Row} from "react-bootstrap";
import "../assets/styles/MainMenuPage.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import VisitCardMainMenu from "../components/VisitCardMainMenu";
import BarChart from "../components/BarChart";
import VerMasButton from "../components/VerMasButton";
import {Link} from "react-router-dom";
import {getLatestVisitRequests, getLatestVisits} from "../services/VisitServices";
import {getUserGroup} from "../services/GroupServices";
import {PersonRowMainMenu} from "../components/PersonRowMainMenu";
import {getUser, getUserById} from "../services/UserServices";


export const MainMenuPage = () => {

    let {authTokens, user} = useContext(AuthContext)
    const [myUser, setMyUser] = useState()
    const [latestVisits, setLatestVisits] = useState()
    const [latestVisitRequests, setLatestVisitRequests] = useState()
    const [userGroup, setUserGroup] = useState([])


    const getData =  async  ()  => {
        const usuario = await getUser(authTokens.access)
        setMyUser(usuario)
        getLatestVisits(authTokens.access).then(r => setLatestVisits(r))
        getLatestVisitRequests(authTokens.access).then(r => setLatestVisitRequests(r))
        getUserGroup(authTokens.access, usuario.id).then(r => setUserGroup(r))
    }

    useEffect( () => {

        getData();

    }, []);

    return (
        <Container fluid className="main-menu-container">
            <Row>
                <Col lg={4}>
                    <Card className="profile-card " id="left-card">
                        <Row className={'justify-content-end'}>
                            <Col md={4} xs={6}>
                                <Link to={'/me'}>
                                    <VerMasButton/>
                                </Link>
                            </Col>
                        </Row>

                        <Container className={'d-flex align-items-center'}>
                            <Container>

                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Avatar src={'data:image/png;base64, ' + myUser?.profile_picture}
                                                sx={{width: 128, height: 128}}/>
                                    </Col>
                                </Row>

                                <Row className="text-center">
                                    <strong>
                                        <h3>{myUser?.first_name} {myUser?.last_name}</h3>
                                    </strong>
                                </Row>

                                <Container>
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
                        </Container>

                    </Card>

                    <Card className="last-visits-card border d-flex align-items-center" id="left-card">
                        <Container className="">
                            <Row className="text-center first-row-main-menu-card">
                                <h4>Consultas resueltas en la ultima visita:</h4>
                            </Row>
                            <Row className="text-center">
                                {latestVisitRequests && latestVisitRequests.length > 0 ? (
                                    <h3 className="fw-bold">{latestVisitRequests[0].requests}</h3>
                                ) : (
                                    <p>No visit requests available</p>
                                )}
                            </Row>
                        </Container>
                    </Card>

                </Col>

                <Col lg={4}>
                    <Card className="next-visits-card" id="center-card">
                        <Container>
                            <Row className="text-center">
                                <h2 className="name-title">Próximas Visitas</h2>
                            </Row>
                            <Container className="container-visit-card-main-menu">
                                {latestVisits?.map((visit) => (
                                    <VisitCardMainMenu name={visit.name} status={visit.status}/>
                                ))}
                            </Container>
                            <Link to={'/visits'}>
                                <Row className={'justify-content-end'}>
                                    <Col md={4} xs={6}>
                                        <VerMasButton className={'ver-mas-bottom-visit'}/>
                                    </Col>
                                </Row>
                            </Link>

                        </Container>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className="group-card-main-menu" id="right-card">
                        <Row className={'justify-content-end'}>
                            <Col md={4} xs={6}>
                                <Link to={'/groups'}>
                                    <VerMasButton/>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            {userGroup && userGroup.length > 0 ? (
                                    <h2 className="name-title">{userGroup[0].group}</h2>
                                ) : (
                                    <h2 className="name-title" onClick={() => console.log(userGroup)}>Sin Grupo</h2>
                                )}

                        </Row>
                        <Row className="justify-content-center text-center">

                            {userGroup?.map((i) => (
                                <PersonRowMainMenu role={i?.role} first_name={i?.first_name} last_name={i?.last_name}/>
                            ))}
                        </Row>
                    </Card>

                    <Card className="report-card-main-menu d-flex align-items-center" id="right-card">
                        <Container>
                            <Row className="text-center">
                                <h2 className="name-title ">Consultas</h2>
                            </Row>
                            <Row>

                                <BarChart className="barchart-report-card-main-menu" chartData={{
                                    labels: ["Pedro", "Maria", "Juan"],
                                    datasets: [{
                                        label: "",
                                        data: [30, 30, 40],
                                        backgroundColor: ["red", "green", "blue"]
                                    }]
                                }}/>

                            </Row>
                        </Container>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}