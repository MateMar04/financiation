import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import {getUserById} from "../services/UserServices";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Zoom} from "@mui/material";


export const CoordinatorCard = ({addToGroup, userId}) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])
    let [user, setUser] = useState([])


    useEffect(() => {
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
        // getUserById(authTokens.access, userId).then(data => setUser(data))
    }, [])


    return (
        <>
            {coordinators?.map((coordinator) => (
                <Zoom in>
                    <div className={'mt-3'}>
                        <Card>
                            <Container className={'OutlineCard'}>
                                <Row key={coordinator.id}>
                                    <Col md={2} xs={3} lg={2}>
                                        <Avatar alt="Remy Sharp" src={coordinator?.profile_picture}
                                                sx={{width: 56, height: 56}}/>
                                    </Col>
                                    <Col>
                                        <Row >
                                            <Col xs={9} md={6}>
                                                <strong className={'PrimaryText'}>
                                                    <a>{coordinator.first_name} {coordinator.last_name}</a>
                                                </strong>
                                            </Col>
                                            <Col xs={9} md={5}>
                                                <a>Disponible</a>
                                            </Col>
                                            <Col xs={1} md={1}>
                                                <IconButton value={coordinator.id} onClick={addToGroup}>
                                                    <GroupAddIcon/>
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
                </Zoom>
            ))}

        </>


    )
}

export default CoordinatorCard;