import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Form, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getUserById} from "../services/UserServices";

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
                <div className={'my-1'}>
                    <Container className={'OutlineCard'}>
                        <Row>
                            <Col md={1} xs={1} lg={1}>
                                <Avatar alt="Remy Sharp" src={advisor?.profile_picture} sx={{width: 56, height: 56}}/>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <strong>
                                            <a>{advisor.first_name} {advisor.last_name}</a>
                                        </strong>
                                    </Col>
                                    <Col>
                                        <small>Asesor</small>
                                    </Col>
                                    <Col key={user.id}>
                                        <Form.Check name="radio" type="radio" value={user.id}></Form.Check>

                                    </Col>
                                </Row>
                                <Row>

                                </Row>
                                <Row className={'TextEmailCard'}>
                                    <small>{advisor.email}</small>

                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ))}
        </>


    )
}

export default AdvisorCard;