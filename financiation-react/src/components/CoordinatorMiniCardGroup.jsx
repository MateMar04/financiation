import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import AuthContext from "../context/AuthContext";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {getGroupAdvisorUsers, getGroupCoordinatorUsers, getUser} from "../services/UserServices";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';

export const CoordinatorMiniCardGroup = ({group, showButton}) => {

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
                                    username={coordinator?.username}>
                            </Avatar>
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
                        <Col>
                            {showButton && <IconButton><ClearIcon/></IconButton>}
                        </Col>
                    </Row>
                    <hr/>
                </Container>
            ))}
        </>


    )
}


export default CoordinatorMiniCardGroup;