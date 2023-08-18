import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import IconButton from "@mui/material/IconButton";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Zoom} from "@mui/material";


export const UserCard = ({user}) => {

    let {authTokens} = useContext(AuthContext)

    return (
        <>
            
                <Zoom in style={{ transitionDelay: '300ms'}}>
                <div className={'mt-3'}>
                    <Card>
                        <Container className={'OutlineCard'}>
                            <Row key={user.id}>
                                <Col md={2} xs={3} lg={2}>
                                    <Avatar alt="Remy Sharp" src={user?.profile_picture}
                                            sx={{width: 56, height: 56}}/>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col xs={9} md={6}>
                                            <strong>
                                                <a>{user.first_name} {user.last_name}</a>
                                            </strong>
                                        </Col>
                                        <Col xs={9} md={5}>
                                            <a>{user.id_role}</a>
                                        </Col>
                                        <Col xs={1} md={1}>
                                            <IconButton value={console.log(user.id)}>
                                                <GroupAddIcon/>
                                            </IconButton>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <small>{user.id_user_status}</small>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </div>
                </Zoom>
        </>
    )
}

export default UserCard;