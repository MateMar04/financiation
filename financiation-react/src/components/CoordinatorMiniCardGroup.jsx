import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getGroupCoordinatorUsers, getUser} from "../services/UserServices";


export const CoordinatorMiniCardGroup = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])
    let [user, setUser] = useState()

    useEffect(() => {
        getGroupCoordinatorUsers(authTokens.access, group.id).then(data => setCoordinators(data))
        getUser(authTokens.access).then(data => setUser(data))
    }, [])


    return (
        <>
            {coordinators?.map((coordinator) => (
                <Container key={coordinator.id_user}>
                    <Row className='AdvisorBorder'>
                        <Col xs="2" md="2" className='"d-flex align-items-center justify-content-center'>
                            <Avatar alt="Remy Sharp" className='AvatarImg' src={coordinator?.profile_picture}
                                    username={user?.username}/>
                        </Col>
                        <Col>
                            <Row>
                                <div className="d-flex align-items-center">
                                    <strong className='PrimaryText'>
                                        <p>{coordinator.first_name} {coordinator.last_name}</p>
                                    </strong>
                                </div>
                                <sub className='SecondaryText'>Coordinador</sub>
                            </Row>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
            ))}
        </>

    )
}

export default CoordinatorMiniCardGroup;