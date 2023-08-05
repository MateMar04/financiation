import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getCoordinatorUsers} from "../services/CoordinatorServices";

export const AllAdvisorsMinisCards = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])

    useEffect(() => {
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
    }, [])

    return (
        <>
            {advisors?.map((advisor) => (
                <Container className={'AllAdvisorMiniCard'}>
                        <Row>
                            <Col md={{ span: 4, offset: 4 }} className="mx-auto">
                                <Avatar alt="Remy Sharp" className='AvatarImg' src={advisor?.profile_picture}>
                                </Avatar>
                            </Col>
                        </Row>
                        <Row className={'justify-content-center'}>
                                <strong className='PrimaryText'>
                                    <p>{advisor.first_name} {advisor.last_name}</p>
                                </strong>
                            <sub className='SecondaryText'>Asesor</sub>
                        </Row>

                </Container>
            ))}
        </>


    )
}

export default AllAdvisorsMinisCards;