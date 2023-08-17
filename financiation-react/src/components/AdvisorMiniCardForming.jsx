import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getAdvisorUsers} from "../services/AdvisorServices";
import {Zoom} from "@mui/material";

export const AdvisorMiniCardForming = ({advisor}) => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])

    useEffect(() => {
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
    }, [])

    return (
        <>
                <Zoom in>
                <div className={'my-1'}>
                    <Container className={'AllAdvisorMiniCard'}>
                        <Row>
                            <Col md={2} xs={3}>
                                <Avatar alt="Remy Sharp" className='AvatarImg' src={advisor?.profile_picture}/>
                            </Col>

                            <Col md={9} xs={9} className={'justify-content-center'}>
                                <strong className='PrimaryText'>
                                    <sub>{advisor.first_name} {advisor.last_name}</sub>
                                </strong>
                            </Col>
                        </Row>
                        <Row className={'justify-content-center'}>
                            <sub className='SecondaryText'>Asesor</sub>
                        </Row>
                    </Container>
                </div>
                </Zoom>
        </>


    )
}

export default AdvisorMiniCardForming;
