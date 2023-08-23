import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import {Zoom} from "@mui/material";
import {getUserStatusesById} from "../services/StatusServices";
import {getUserRolesById} from "../services/RoleServices";


export const UserCard = ({user}) => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    let {authTokens} = useContext(AuthContext)
    let [role, setRole] = useState([])
    let [status, setStatus] = useState([])

    useEffect(() => {
        getUserStatusesById(authTokens.access, user.id_user_status).then(data => setStatus(data))
        getUserRolesById(authTokens.access, user.id_role).then(data => setRole(data))
    }, [])

    return (
        <>
                <Zoom in style={{ transitionDelay: '300ms'}}>
                <div className={'UserCard font'}>
                    <Card className='UserCard font'>
                        <Container className={'OutlineCard'}>
                            <Row key={user.id}>
                                <Col md={1} xs={2} className='profileimage'>
                                    <Avatar alt="Remy Sharp" src={user?.profile_picture}
                                            sx={{width: 56, height: 56}}/>
                                </Col>
                                <Col xs={2} md={3} className='name'>
                                    <Row>
                                        <Col>
                                            <strong>
                                                <a>{user.first_name} {user.last_name}</a>
                                            </strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <small>{role.name}</small>
                                    </Row>
                                </Col>
                                {status.name === 'Disponible' ? (
                                        <Col xs={2} md={3} className='status'>
                                            <a>{status.name} <div className='circle_green'></div></a>
                                        </Col>
                                    ):(
                                        <Col xs={2} md={3} className='status'>
                                            <a>{status.name} <div className='circle_red'></div></a>
                                        </Col>
                                    )
                                }
                                {status.name === 'Disponible' ? (
                                    <Col xs={2} md={2} className='role content-select'>
                                        <select placeholder="Rol en grupo" className='form-select ' name="Role">
                                            <option value="none" selected disabled hidden>Seleccionar</option>
                                            <option>Coordinador</option>
                                            <option>Asesor</option>
                                        </select>
                                        <i></i>
                                    </Col>
                                    ) : (
                                    <Col xs={2} md={4} className='role'>
                                        <a>Este usuario se encuentra ocupado</a>
                                    </Col>
                                    )
                                }
                                {status.name === 'Disponible' ? (
                                        <Col xs={2} md={3} className='name'>
                                            <Row>
                                                <Checkbox
                                                    {...label}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                                                />
                                            </Row>
                                        </Col> 
                                    ) : (
                                        <Col>
                                        </Col>
                                    )
                                }
                                 
                            </Row>
                        </Container>
                    </Card>
                </div>
                </Zoom>
        </>
    )
}

export default UserCard;