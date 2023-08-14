import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getAdvisorUsers} from "../services/AdvisorServices";

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
                            <Col md={2}>
                                <Avatar alt="Remy Sharp" className='AvatarImg' src={advisor?.profile_picture}/>
                            </Col>

                            <Col md={9}>
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