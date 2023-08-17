import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getUsers} from "../services/UserServices";
import {getUserById} from "../services/UserServices";
import Card from '@mui/material/Card';
import IconButton from "@mui/material/IconButton";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Zoom} from "@mui/material";


export const UserCard = ({user}) => {

    let {authTokens} = useContext(AuthContext)
    let [users, setUsers] = useState([])

    useEffect(() => {
        getUsers(authTokens.access).then(data => setUsers(data))
    }, [])

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
                                            <a>En Visita</a>
                                        </Col>
                                        <Col xs={1} md={1}>
                                            <IconButton value={console.log(user.id)} onClick={addToGroup}>
                                                <GroupAddIcon/>
                                            </IconButton>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <small>Asesor</small>
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

export default AdvisorCard;