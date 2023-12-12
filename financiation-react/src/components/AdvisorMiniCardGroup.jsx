import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getGroupAdvisorUsers} from "../services/UserServices";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import AdvisorCreateModal from './AdvisorCreateModal';
import {Button, message, Popconfirm, Popover} from 'antd';


export const AdvisorMiniCardGroup = ({group, showButton}) => {

    let {authTokens} = useContext(AuthContext);
    let [advisors, setAdvisors] = useState([])
    const [updateFlag, setUpdateFlag] = useState(false);
    const [advisorDeleted, setAdvisorDeleted] = useState(false);
    const toggleAdvisorDeleted = () => setAdvisorDeleted(!advisorDeleted);
    const [showCreationModal, setShowCreationModal] = useState(false);
    const toggleCreationModal = () => setShowCreationModal(!showCreationModal);

    useEffect(() => {
        getGroupAdvisorUsers(authTokens.access, group.id).then(data => setAdvisors(data))
    }, [advisorDeleted, updateFlag])


    const cancel = (e) => {
        message.error('Se ha cancelado la eliminación');
    };

    const handleDeleteAdvisor = async (advisorId, groupId) => {
        try {
            let response = await fetch(`/api/groups/${groupId}/advisors/delete/${advisorId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "JWT " + String(authTokens.access),
                    "Accept": "application/json"
                },
            });
            if (response.status === 200) {
                toggleAdvisorDeleted();
                message.success('Se borró el usuario exitosamente');
            } else {
                console.error("No se pudo borrar el asesor");
            }
        } catch (error) {
            console.error("No se pudo borrar el asesor:", error);
        }
    };


    return (
        <>
            <AdvisorCreateModal group={group} onClose={() => toggleCreationModal()} updateFlag={updateFlag}
                                setUpdateFlag={setUpdateFlag} show={showCreationModal}/>
            {advisors?.map((advisor, i) => (
                <Container key={i}>
                    <Row className='AdvisorBorder'>
                        <Col xs={3} md={2} className='"d-flex align-items-center justify-content-center'>
                            <Avatar alt="Remy Sharp" className='AvatarImg'
                                    src={'data:image/png;base64, ' + advisor?.profile_picture}>
                            </Avatar>
                        </Col>
                        <Col>
                            <Row>
                                <div className="d-flex align-items-center">
                                    <strong className='PrimaryText'>
                                        <p>{advisor.first_name} {advisor.last_name}</p>
                                    </strong>
                                </div>
                                <sub className='SecondaryText'>Asesor</sub>
                            </Row>
                        </Col>
                        <Col md={1} xs={1}>
                            <Row className={'justify-content-end'}>
                                {showButton &&
                                    <Popover content={'Eliminar'}>
                                        <Popconfirm
                                            title="Eliminar usuario del grupo"
                                            description="Esta seguro de que quiere eliminarlo?"
                                            onConfirm={() => handleDeleteAdvisor(advisor.id, group.id)}
                                            onCancel={cancel}
                                            okText="Si"
                                            cancelText="No">
                                            <IconButton><ClearIcon/></IconButton>
                                        </Popconfirm>
                                    </Popover>}
                            </Row>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
            ))}
            {showButton && <div className='centered_icon'>
                <div className='buttonWithBorder'>
                    <Popover content={'Agregar nuevo asesor'}>
                        <IconButton type="submit" aria-label="search" onClick={() => toggleCreationModal()}><AddIcon
                            fontSize="large"/></IconButton>
                    </Popover>
                </div>
            </div>}
        </>


    )
}


export default AdvisorMiniCardGroup;