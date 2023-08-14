import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import {Zoom} from "@mui/material";


export const CoordinatorMiniCardForming = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
    }, [])

    return (
        <>
            {coordinators?.map((coordinator) => (
                <Zoom in>
                <div className={'my-1'}>
                    <Container className={'AllAdvisorMiniCard'}>
                        <Row>
                            <Col md={2}  xs={3}>
                                <Avatar alt="Remy Sharp" className='AvatarImg' src={coordinator?.profile_picture}/>
                            </Col>
                            <Col md={9} xs={9}>
                                <strong className='PrimaryText'>
                                    <sub>{coordinator.first_name} {coordinator.last_name}</sub>
                                </strong>
                            </Col>
                        </Row>
                        <Row>
                            <sub className='SecondaryText'>Coordinador</sub>
                        </Row>
                    </Container>
                </div>
                </Zoom>
            ))}
        </>


    )
}

export default CoordinatorMiniCardForming;