import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/GroupCard.css"
import AuthContext from "../context/AuthContext";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import {AdvisorMiniCardGroup} from "./AdvisorMiniCardGroup";
import {CoordinatorMiniCardGroup} from "./CoordinatorMiniCardGroup";
import {getGroupAdvisorUsers, getGroupCoordinatorUsers} from "../services/UserServices";
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@mui/material/IconButton";


export const GroupCard = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])
    let [advisors, setAdvisors] = useState([])

    const [showButton, setShowButton] = useState(false);

    const handleAddButton = () => {
        setShowButton(!showButton);
    };


    useEffect(() => {
        getGroupAdvisorUsers(authTokens.access, group.id).then(data => setAdvisors(data))
        getGroupCoordinatorUsers(authTokens.access, group.id).then(data => setCoordinators(data))
    }, [])

    const handleDeleteCoordinator = () => {
        console.log('Coordinador eliminado brother')
    };

    const handleDeleteAdvisor = () => {
        console.log('Asesor eliminado brother')
    };

    return (
        <Container fluid className='CompletlyContainer'>
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{group.name}</Typography>

                    </AccordionSummary>

                    <AccordionDetails>
                        <IconButton type="submit" aria-label="search" onClick={handleAddButton}>
                            <CreateIcon/>
                        </IconButton>
                        <Container>
                            <Row>
                                <Col>
                                    <AdvisorMiniCardGroup group={group} showButton={showButton} DeleteAdvisor={handleDeleteAdvisor}/>
                                </Col>
                                <Col md={1}>
                                    <div className="vl"></div>
                                </Col>
                                <Col>
                                    <CoordinatorMiniCardGroup group={group} showButton={showButton} DeleteCoordinator={handleDeleteCoordinator}/>
                                </Col>
                            </Row>
                        </Container>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Container>

    )
}

export default GroupCard;