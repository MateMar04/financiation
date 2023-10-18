import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import { getGroupCoordinatorUsers } from "../services/UserServices";
import { getCoordinators } from "../services/CoordinatorServices";
import AddIcon from '@mui/icons-material/Add';
import CoordinatorCreateModal from './CoordinatorCreateModal';

export const CoordinatorMiniCardGroup = ({ group, showButton }) => {
    let { authTokens } = useContext(AuthContext)
    const [coordinators, setCoordinators] = useState([])
    const [coordinatorDeleted, setCoordinatorDeleted] = useState(false);
    const toggleCoordinatorDeleted = () => setCoordinatorDeleted(!coordinatorDeleted);
    const [showCreationModal, setShowCreationModal] = useState(false);
    const toggleCreationModal = () => setShowCreationModal(!showCreationModal);

    useEffect(() => {
        getGroupCoordinatorUsers(authTokens.access, group.id).then(data => setCoordinators(data))
    }, [coordinatorDeleted])

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
            } else {
                console.error("Coordinator deletion failed");
            }
        } catch (error) {
            console.error("Error deleting coordinator:", error);
        }
    };

    return (
        <>
            <CoordinatorCreateModal group={group} onClose={() => toggleCreationModal()} show={showCreationModal}/>
            {coordinators?.map((coordinator) => (
                <Container key={coordinator.id_user}>
                    <Row className='AdvisorBorder'>
                        <Col xs="2" md="2" className='"d-flex align-items-center justify-content-center'>
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
                                {showButton && <IconButton onClick={() => handleDeleteCoordinator(coordinator.id, group.id)}><ClearIcon /></IconButton>}
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            ))}
            <div className='centered_icon'>
                <div className='buttonWithBorder'>
                    <IconButton  type="submit" aria-label="search" onClick={() => toggleCreationModal()}>
                        <AddIcon fontSize="large"/>
                    </IconButton>
                </div>
            </div>
            
        </>
    )
}

export default CoordinatorMiniCardGroup;
