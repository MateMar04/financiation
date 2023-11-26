import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import { getGroupCoordinatorUsers } from "../services/UserServices";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CoordinatorCreateModal from './CoordinatorCreateModal';
import { Button, message, Popconfirm, Popover } from 'antd';

export const CoordinatorMiniCardGroup = ({ group, showButton }) => {
    let { authTokens } = useContext(AuthContext)
    const [updateFlag, setUpdateFlag] = useState(false);
    const [coordinators, setCoordinators] = useState([])
    const [coordinatorDeleted, setCoordinatorDeleted] = useState(false);
    const toggleCoordinatorDeleted = () => setCoordinatorDeleted(!coordinatorDeleted);
    const [showCreationModal, setShowCreationModal] = useState(false);
    const toggleCreationModal = () => setShowCreationModal(!showCreationModal);

    useEffect(() => {
        getGroupCoordinatorUsers(authTokens.access, group.id).then(data => setCoordinators(data))
    }, [coordinatorDeleted, updateFlag])

    const cancel = (e) => {
        message.error('Se ha cancelado la eliminación');
    };

    const handleDeleteCoordinator = async (coordinatorId, groupId) => {
        try {
            const response = await fetch(`/api/groups/${groupId}/coordinators/delete/${coordinatorId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "JWT " + String(authTokens.access),
                    "Accept": "application/json"
                },
            });
            if (response.status === 200) {
                toggleCoordinatorDeleted();
                message.success('Se borró el usuario exitosamente');
            } else {
                console.error("No se pudo borrar el coordinador");
            }
        } catch (error) {
            console.error("No se pudo borrar el coordinador:", error);
        }
    };

    return (
        <>
            <CoordinatorCreateModal group={group} onClose={() => toggleCreationModal()} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} show={showCreationModal}/>
            {coordinators?.map((coordinator, i) => (
                <Container key={i}>
                    <Row className='AdvisorBorder'>
                        <Col xs="3" md="2" className='"d-flex align-items-center justify-content-center'>
                            <Avatar alt="Remy Sharp" className='AvatarImg' src={'data:image/png;base64, ' + coordinator?.profile_picture}>
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
                        <Col md={1} xs={1}>
                            <Row className={'justify-content-end'}>
                                {showButton &&
                                     <Popover content={'Eliminar'}>
                                    <Popconfirm
                                    title="Eliminar usuario del grupo"
                                    description="Esta seguro de que quiere eliminarlo?"
                                    onConfirm={() => handleDeleteCoordinator(coordinator.id, group.id)}
                                    onCancel={cancel}
                                    okText="Si"
                                    cancelText="No">
                                        <IconButton><ClearIcon /></IconButton>
                                    </Popconfirm>
                                     </Popover>}
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            ))}
            {showButton &&
                <div className='centered_icon'>
                <div className='buttonWithBorder'>
                    <Popover content={'Agregar nuevo coordinador'}>
                     <IconButton  type="submit" aria-label="search" onClick={() => toggleCreationModal()}><AddIcon fontSize="large"/></IconButton>
                </Popover>
                </div>
            </div>}

        </>
    )
}

export default CoordinatorMiniCardGroup;