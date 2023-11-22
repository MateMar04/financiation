import React, { useContext, useState, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { Zoom } from "@mui/material";
import { getUserStatusesById } from "../services/StatusServices";
import { getUserRolesById } from "../services/RoleServices";
import { Tooltip } from 'antd';

export const UserCard = ({ user, isChecked, onCheckboxChange, onRoleChange,defaultRole}) => {
    const { authTokens } = useContext(AuthContext);
    const [role, setRole] = useState([]);
    const [status, setStatus] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);

    const handleCheckboxChange = () => {
        onCheckboxChange(user.id, selectedRole);
    };

    const handleRoleChange = (e) => {
        const roleValue = e.target.value;
        setSelectedRole(roleValue);
        onRoleChange(user.id, roleValue);
    };

    const setDefaultRole = () => {
        if (defaultRole === 'coordinador') {
            setSelectedRole('coordinador');
        } else if (defaultRole === 'asesor') {
            setSelectedRole('asesor');
        } else {
            setSelectedRole(null);
        }
    };
    

    useEffect(() => {
        getUserStatusesById(authTokens.access, user?.user_status).then((data) => setStatus(data));
        getUserRolesById(authTokens.access, user?.role).then((data) => setRole(data));
        setDefaultRole();
    }, [authTokens.access, user, defaultRole]);

    return (
        <>
            <Tooltip title="Seleccione el rol que tendra el usuario antes de agregarlo" placement="right" color='blue' key='blue'>
                <Zoom in style={{ transitionDelay: '200ms' }}>
                    <div className={'UserCard font'}>
                        <Container>
                            <Card className='UserCard font'>
                                <Container className='UserCard'>
                                    <Row key={user.id}>
                                        <Col md={1} xs={1} className='profileimage'>
                                            <Avatar className='avatar' alt="Remy Sharp" src={'data:image/png;base64, ' + user?.profile_picture} />
                                        </Col>
                                        <Col xs={3} md={3} className='name'>
                                            <Row>
                                                <strong>
                                                    <p>{user.first_name} {user.last_name}</p>
                                                </strong>
                                            </Row>
                                            <Row>
                                                <small>{role.name}</small>
                                            </Row>
                                        </Col>
                                        {status.name === 'Disponible' ? (
                                            <Col xs={3} md={3} className='status'>
                                                <a>{status.name} <a className='circle_green'></a></a>
                                            </Col>
                                        ) : (
                                            <Col xs={3} md={3} className='status'>
                                                <a>{status.name} <a className='circle_red'></a></a>
                                            </Col>
                                        )}
                                        {status.name === 'Disponible' ? (
                                            <Col xs={2} md={3} className='role content-select'>
                                                <select
                                                    placeholder="Rol en grupo"
                                                    className='form-select'
                                                    name="Role"
                                                    onChange={handleRoleChange}
                                                >
                                                    <option value="seleccionar" disabled hidden selected>{selectedRole}</option>
                                                    <option value="coordinador">Coordinador</option>
                                                    <option value="asesor">Asesor</option>
                                                </select>
                                                <i></i>
                                            </Col>
                                        ) : (
                                            <Col xs={5} md={5} className='roleocupado'>
                                                <a>Este usuario se encuentra ocupado</a>
                                            </Col>
                                        )}
                                        {status.name === 'Disponible' ? (
                                            <Col xs={2} md={2} className='check'>
                                                <Row>
                                                <input
                                                    type="checkbox"
                                                    className='check'
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange}
                                                    disabled={!selectedRole}
                                                />

                                                </Row>
                                            </Col>
                                        ) : (
                                            <Col>
                                            </Col>
                                        )}
                                    </Row>
                                </Container>
                            </Card>
                        </Container>
                    </div>
                </Zoom>
            </Tooltip>
        </>
    );
};

export default UserCard;