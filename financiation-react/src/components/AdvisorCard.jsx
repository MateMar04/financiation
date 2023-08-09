import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getAdvisorUsers} from "../services/AdvisorServices";

export const AdvisorCard = () => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])

    useEffect(() => {
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
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
                                    <strong>
                                        <a>{advisor.first_name} {advisor.last_name}</a>
                                    </strong>
                                </Row>
                                <Row>
                                    <sub>Asesor</sub>
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