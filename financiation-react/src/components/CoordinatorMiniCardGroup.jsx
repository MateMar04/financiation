import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import {getCoordinatorUsers} from "../services/CoordinatorServices";

export const CoordinatorMiniCardGroup = ({group, showButton, DeleteCoordinator}) => {
    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
    }, [])

    return (
        <>
            {coordinators?.map((coordinator) => (
                <Container key={coordinator.id_user}>
                    <Row className='AdvisorBorder'>
                        <Col xs="2" md="2" className='"d-flex align-items-center justify-content-center'>
                            <Avatar alt="Remy Sharp" className='AvatarImg' src={coordinator?.profile_picture}>
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
                        <Col  md={1} xs={1}>
                            <Row className={'justify-content-end'}>
                                {showButton && <IconButton onClick={DeleteCoordinator}><ClearIcon/></IconButton>}
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