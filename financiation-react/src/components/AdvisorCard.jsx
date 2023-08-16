import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getUserById} from "../services/UserServices";
import Card from '@mui/material/Card';
import IconButton from "@mui/material/IconButton";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Zoom} from "@mui/material";


export const AdvisorCard = ({addToGroup, userId}) => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [user, setUser] = useState([])

    useEffect(() => {
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
        getUserById(authTokens.access, userId).then(data => setUser(data))
    }, [])

    return (
        <>
            {advisors?.map((advisor) => (
                <Zoom in style={{ transitionDelay: '300ms'}}>
                <div className={'mt-3'}>
                    <Card>
                        <Container className={'OutlineCard'}>
                            <Row>
                                <Col md={2} xs={3} lg={2}>
                                    <Avatar alt="Remy Sharp" src={advisor?.profile_picture}
                                            sx={{width: 56, height: 56}}/>
                                </Col>
                                <Col>
                                    <Row key={user.id}>
                                        <Col xs={9} md={6}>
                                            <strong>
                                                <a>{advisor.first_name} {advisor.last_name}</a>
                                            </strong>
                                        </Col>
                                        <Col xs={9} md={5}>
                                            <a>En Visita</a>
                                        </Col>
                                        <Col xs={1} md={1}>
                                            <IconButton value={user.id} onClick={addToGroup}>
                                                <GroupAddIcon/>
                                            </IconButton>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <small>Asesor</small>
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

export default AdvisorCard;