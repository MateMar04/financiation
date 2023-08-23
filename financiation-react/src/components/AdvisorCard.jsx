import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getUserStatusesById} from "../services/StatusServices";
import {getUserRolesById} from "../services/RoleServices";
import Card from '@mui/material/Card';
import IconButton from "@mui/material/IconButton";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Zoom} from "@mui/material";


export const AdvisorCard = ({statusId, advisor, roleId}) => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [role, setRole] = useState([])
    let [status, setStatus] = useState([])

    useEffect(() => {
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
        getUserStatusesById(authTokens.access, statusId).then(data => setStatus(data))
        getUserRolesById(authTokens.access, roleId).then(data => setRole(data))
    }, [])

    return (
        <>
            
                <Zoom in style={{ transitionDelay: '300ms'}}>
                <div className={'mt-3'}>
                    <Card>
                        <Container className={'OutlineCard'}>
                            <Row key={advisor.id}>
                                <Col md={2} xs={3} lg={2}>
                                    <Avatar alt="Remy Sharp" src={advisor?.profile_picture}
                                            sx={{width: 56, height: 56}}/>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col xs={9} md={6}>
                                            <strong>
                                                <a>{advisor.first_name} {advisor.last_name}</a>
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

export default AdvisorCard;