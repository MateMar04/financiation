import React, {useState, useEffect, useContext} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/GroupCard.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AdvisorMiniCardGroup} from "./AdvisorMiniCardGroup";
import {CoordinatorMiniCardGroup} from "./CoordinatorMiniCardGroup";
import AuthContext from "../context/AuthContext";
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import {Zoom} from "@mui/material";
import AdvisorCoordinatorCreateModal from './CoordinatorCreateModal';

export const GroupCard = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    const [showButton, setShowButton] = useState(false);
    const [showCreationModal, setShowCreationModal] = useState(false);
    const toggleCreationModal = () => setShowCreationModal(!showCreationModal);

    const handleAddButton = () => {
        setShowButton(!showButton);
    };

    return (
        <Container fluid className='CompletlyContainer'>
            <AdvisorCoordinatorCreateModal onClose={() => toggleCreationModal()} show={showCreationModal}/>
            <Zoom in style={{transitionDelay: '100ms'}}>
                <div>
                    <Accordion className={'accordion-group'}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{group.name}</Typography>

                        </AccordionSummary>

                        <AccordionDetails>
                            <Row className={'justify-content-start pencil-groups'}>
                                <Col md={11}>
                                    <IconButton type="submit" aria-label="search" onClick={handleAddButton}>
                                        <CreateIcon/>
                                    </IconButton>
                                </Col>
                                <Col>
                                    {showButton && <IconButton type="submit" aria-label="search" onClick={() => toggleCreationModal()}>
                                        <AddIcon fontSize="large"/>
                                    </IconButton>}
                                </Col>
                            </Row>
                            <Container>
                                <Row>
                                    <Col>
                                        <AdvisorMiniCardGroup group={group} showButton={showButton}/>
                                    </Col>
                                    <Col md={1}>
                                        <div className="vl"></div>
                                    </Col>
                                    <Col>
                                        <CoordinatorMiniCardGroup group={group} showButton={showButton}/>
                                    </Col>
                                </Row>
                            </Container>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Zoom>
        </Container>

    )
}

export default GroupCard;