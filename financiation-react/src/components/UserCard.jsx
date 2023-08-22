import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import IconButton from "@mui/material/IconButton";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Zoom} from "@mui/material";
import {getUserStatusesById} from "../services/StatusServices";
import {getUserRolesById} from "../services/RoleServices";


export const UserCard = ({user}) => {

    let {authTokens} = useContext(AuthContext)
    let [role, setRole] = useState([])
    let [status, setStatus] = useState([])

    useEffect(() => {
        getUserStatusesById(authTokens.access, user.id_user_status).then(data => setStatus(data))
        getUserRolesById(authTokens.access, user.id_role).then(data => setRole(data))
    }, [])

    return (
        <>
            
                <Zoom in style={{ transitionDelay: '300ms'}}>
                <div className={'mt-3'}>
                    <Card>
                        <Container className={'OutlineCard'}>
                            <Row key={user.id}>
                                <Col md={2} xs={3} lg={2}>
                                    <Avatar alt="Remy Sharp" src={user?.profile_picture}
                                            sx={{width: 56, height: 56}}/>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col xs={9} md={6}>
                                            <strong>
                                                <a>{user.first_name} {user.last_name}</a>
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
                                    <Row>
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

export default UserCard;