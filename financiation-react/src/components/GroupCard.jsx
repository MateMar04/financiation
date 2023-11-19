import React, { useState, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "../assets/styles/GroupCard.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';  // Import the DeleteIcon
import IconButton from "@mui/material/IconButton";
import { Zoom } from "@mui/material";
import AuthContext from "../context/AuthContext";
import { AdvisorMiniCardGroup } from "./AdvisorMiniCardGroup";
import { CoordinatorMiniCardGroup } from "./CoordinatorMiniCardGroup";
import FailedModal from './FailedModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const GroupCard = ({group, onDeleteSuccess}) => {
    const { authTokens } = useContext(AuthContext);
    const [showButton, setShowButton] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const toggleModalfail = () => setShowConfirmDeleteModal(!showConfirmDeleteModal);

    const handleAddButton = () => {
        setShowButton(!showButton);
    };

    let deletegroup = async (id) => {
        let response = await fetch(`/api/groups/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
        });
        if (response.status === 200) {
            onDeleteSuccess();
        } else {
            toggleModalfail();
        }
    }

    return (
        <Container fluid className='CompletlyContainer'>
            <Zoom in style={{ transitionDelay: '100ms' }}>
                <div>
                    <Accordion className={'accordion-group'}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{group.name}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Container>
                                <Row className={'align-items-center'}>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <IconButton type="submit" aria-label="search" onClick={handleAddButton}>
                                                    <CreateIcon />
                                                </IconButton>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="ml-auto"> 
                                        {showButton && (
                                            <IconButton className='delete-button' type="submit" aria-label="delete" onClick={() => deletegroup(group.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <AdvisorMiniCardGroup group={group} showButton={showButton} />
                                    </Col>
                                    <Col md={1}>
                                        <div className="vl"></div>
                                    </Col>
                                    <Col>
                                        <CoordinatorMiniCardGroup group={group} showButton={showButton} />
                                    </Col>
                                </Row>
                            </Container>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Zoom>
            <ConfirmDeleteModal show={showConfirmDeleteModal} onClose={() => toggleModalfail()}/>
        </Container>
    );
};

export default GroupCard;
