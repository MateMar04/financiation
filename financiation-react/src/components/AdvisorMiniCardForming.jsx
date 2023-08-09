import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getCoordinatorUsers} from "../services/CoordinatorServices";

export const AdvisorMiniCardForming = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])

    useEffect(() => {
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
    }, [])

    return (
        <>
            {advisors?.map((advisor) => (
                <div className={'my-1'}>
                    <Container className={'AllAdvisorMiniCard'}>
                        <Row>
                            <Col md={1} xs={1} lg={1}>
                                <Avatar alt="Remy Sharp" className='AvatarImg' src={advisor?.profile_picture}/>
                            </Col>
                            <Col>
                                <strong className='PrimaryText'>
                                    <sub>{advisor.first_name} {advisor.last_name}</sub>
                                </strong>
                            </Col>
                        </Row>
                        <Row>
                            <sub className='SecondaryText'>Asesor</sub>
                        </Row>
                    </Container>
                </div>
            ))}
        </>


    )
}

export default AdvisorMiniCardForming;