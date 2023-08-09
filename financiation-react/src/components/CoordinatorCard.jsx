import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getCoordinatorUsers} from "../services/CoordinatorServices";

export const CoordinatorCard = () => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
    }, [])

    return (
        <>
            {coordinators?.map((coordinator) => (
                <div className={'my-1'}>
                <Container className={'OutlineCard'}>
                    <Row>
                        <Col md={1} xs={1} lg={1}>
                            <Avatar alt="Remy Sharp" src={coordinator?.profile_picture} sx={{ width: 56, height: 56 }}/>
                        </Col>
                        <Col>
                                <Row>
                                    <strong>
                                        <a>{coordinator.first_name} {coordinator.last_name}</a>
                                    </strong>
                                </Row>
                                <Row>
                                    <sub>Coordinador</sub>
                                </Row>
                            </Col>
                    </Row>

                </Container>
                </div>
            ))}
        </>


    )
}

export default CoordinatorCard;