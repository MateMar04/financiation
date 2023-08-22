import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import {getUserStatusesById} from "../services/StatusServices";
import {getUserRolesById} from "../services/RoleServices";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import {getUserById} from "../services/UserServices";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Zoom} from "@mui/material";


export const CoordinatorCard = ({statusId, coordinator, roleId}) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])
    let [role, setRole] = useState([])
    let [status, setStatus] = useState([])


    useEffect(() => {
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
        getUserStatusesById(authTokens.access, statusId).then(data => setStatus(data))
        getUserRolesById(authTokens.access, roleId).then(data => setRole(data))
    }, [])

    return (
        <>
            
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
                                                <a>{status.name}</a>
                                            </Col>
                                            <Col xs={1} md={1}>
                                                <IconButton>
                                                    <GroupAddIcon/>
                                                </IconButton>
                                            </Col>
                                        </Row>
                                        <Row className={'TextEmailCard'}>
                                            <small>{role.name}</small>
                                        </Row>

                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </div>
                </Zoom>
        </>
    )
}

export default CoordinatorCard;