import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

export const CoordinatorMiniCardForming = ({group, DeleteCoordinator}) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
    }, [])

    return (
        <>
            {coordinators?.map((coordinator) => (
                <div className={'my-1'}>
                    <Container className={'AllAdvisorMiniCard'}>
                        <Row>
                            <Col md={2} xs={1}>
                                <Avatar alt="Remy Sharp" className='AvatarImg' src={coordinator?.profile_picture}/>
                            </Col>
                            <Col md={9}>
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
            ))}
        </>


    )
}

export default CoordinatorMiniCardForming;