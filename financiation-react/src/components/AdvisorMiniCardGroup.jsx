import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import AuthContext from "../context/AuthContext";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {getGroupAdvisorUsers, getUser} from "../services/UserServices";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';

export const AdvisorMiniCardGroup = ({group, showButton}) => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [user, setUser] = useState()

    useEffect(() => {
        getGroupAdvisorUsers(authTokens.access, group.id).then(data => setAdvisors(data))
        getUser(authTokens.access).then(data => setUser(data))
    }, [])

    return (
        <>
            {advisors?.map((advisor) => (
                <Container key={advisor.id_user}>
                    <Row className='AdvisorBorder'>
                        <Col xs="2" md="2" className='"d-flex align-items-center justify-content-center'>
                            <Avatar alt="Remy Sharp" className='AvatarImg' src={advisor?.profile_picture}
                                    username={user?.username}>
                            </Avatar>
                        </Col>
                        <Col md={5} xs={5}>
                            <Row>
                                <div className="d-flex align-items-center">
                                    <strong className='PrimaryText'>
                                        <p>{advisor.first_name} {advisor.last_name}</p>
                                    </strong>
                                </div>
                                <sub className='SecondaryText'>Asesor</sub>
                            </Row>
                        </Col>
                        <Col md={5} xs={5}>
                            <Row className={'justify-content-end'}>
                                {showButton && <IconButton><ClearIcon/></IconButton>}
                            </Row>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
            ))}
        </>


    )
}


export default AdvisorMiniCardGroup;