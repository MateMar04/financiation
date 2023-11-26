import React, { useContext, useState, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "../assets/styles/AdvisorCard.css";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { MenuItem, Zoom,Select } from "@mui/material";
import { getUserStatusesById } from "../services/StatusServices";
import { getUserRolesById } from "../services/RoleServices";
import { Popover, Tooltip } from 'antd';

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
            
                <Zoom in style={{ transitionDelay: '200ms' }}>
                        <Container>
                            <Card className='UserCard'>
                                <Container>
                                    <Row key={user.id}>
                                        <Col md={1} xs={2} className='profileimage'>
                                            <Avatar className='avatar' alt="Remy Sharp" src={'data:image/png;base64, ' + user?.profile_picture} />
                                        </Col>
                                        <Col xs={6} md={3} className='name'>
                                            <Row>
                                                <strong>
                                                    <p>{user.first_name} {user.last_name}</p>
                                                </strong>
                                            </Row>
                                            <Row>
                                                <sub className='SecondaryText'>{role.name}</sub>
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
                                            <Col xs={8} md={3} className='d-flex align-items-center justify-content-center'>

                                                <select
                                                    placeholder="Rol en grupo"
                                                    className='form-select'
                                                    name="Role"
                                                    onChange={handleRoleChange}
                                                >
                                                    <option value="seleccionar" selected disabled hidden>{selectedRole}Seleccione rol</option>
                                                    <option value="coordinador">Coordinador</option>
                                                    <option value="asesor">Asesor</option>
                                                </select>
                                            </Col>
                                        ) : (
                                            <Col xs={5} md={5} className='roleocupado'>
                                                <a>Este usuario se encuentra ocupado</a>
                                            </Col>
                                        )}
                                        {status.name === 'Disponible' ? (
                                            <Col xs={4} md={2} className='check justify-content-sm-center'>
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
                </Zoom>
        </>
    );
};

export default UserCard;