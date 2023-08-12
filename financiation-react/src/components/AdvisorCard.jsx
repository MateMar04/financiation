import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Form, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getUserById} from "../services/UserServices";
import Card from '@mui/material/Card';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from "@mui/material/IconButton";


export const AdvisorCard = (userId) => {

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
                                    <Col md={3} xs={3}>
                                        <strong>
                                            <a>{advisor.first_name} {advisor.last_name}</a>
                                        </strong>
                                    </Col>
                                    <Col>
                                        <a>En Visita</a>
                                    </Col>
                                    <Col>
                                        <IconButton value={user.id}><ArrowForwardIcon/></IconButton>
                                    </Col>
                                </Row>
                                <Row className={'TextEmailCard'}>
                                    <small>Asesor</small>
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

export default AdvisorCard;