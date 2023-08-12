import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {getUserById} from "../services/UserServices";

export const CoordinatorCard = ({ addToGroup, userId }) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])
    let [user, setUser] = useState([])


    useEffect(() => {
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
        getUserById(authTokens.access, userId).then(data => setUser(data))
    }, [])


    return (
        <>
            {coordinators?.map((coordinator) => (
                <div className={'mt-3'}>
                    <Card>
                        <Container className={'OutlineCard'}>
                            <Row>
                                <Col md={2} xs={3} lg={2}>
                                    <Avatar alt="Remy Sharp" src={coordinator?.profile_picture}
                                            sx={{width: 56, height: 56}}/>
                                </Col>
                                <Col>
                                    <Row key={user.id}>
                                        <Col md={3} xs={3}>
                                            <strong>
                                                <a>{coordinator.first_name} {coordinator.last_name}</a>
                                            </strong>
                                        </Col>
                                        <Col>
                                            <a>Disponible</a>
                                        </Col>
                                        <Col>
                                            <IconButton value={user.id} onClick={addToGroup}>
                                                <ArrowForwardIcon/>
                                            </IconButton>
                                        </Col>
                                    </Row>
                                    <Row className={'TextEmailCard'}>
                                        <small>Coordinador</small>
                                    </Row>
                                </Col>
                            </Row>

                        </Container>
                    </Card>
                </div>
            ))}
        </>


    )
}

export default CoordinatorCard;