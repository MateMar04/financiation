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
import {getGroupAdvisorUsers} from "../services/UserServices";
import AuthContext from "../context/AuthContext";
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@mui/material/IconButton";
import {Zoom} from "@mui/material";


export const GroupCard = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    const [showButton, setShowButton] = useState(false);
    let [advisors, setAdvisors] = useState([])
    let [advisor, setAdvisor] = useState([])

    const handleAddButton = () => {
        setShowButton(!showButton);
    };

    const handleDeleteCoordinator = () => {
        console.log('Coordinador eliminado brother')
    };

    const handleDeleteAdvisor = () => {
        console.log('Coordinador eliminado brother')
    };

    // const handleDeleteAdvisor = (advisorId) => {
    //         console.log("Before deletion:", advisors);
    //         const updatedAdvisors = advisors.filter(advisor => advisor.id_user !== advisorId);
    //         console.log("After deletion:", updatedAdvisors);
    //         setAdvisors(updatedAdvisors);
    // };

    // useEffect(() => {
    //     getGroupAdvisorUsers(authTokens.access, group.id).then(data => setAdvisors(data))
    // }, [])

    return (
        <Container fluid className='CompletlyContainer'>
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
                                <Col md={2}>
                                    <IconButton type="submit" aria-label="search" onClick={handleAddButton}>
                                        <CreateIcon/>
                                    </IconButton>
                                </Col>
                            </Row>
                            <Container>
                                <Row>
                                    <Col>
                                        <AdvisorMiniCardGroup group={group} showButton={showButton}
                                                              DeleteAdvisor={() => handleDeleteAdvisor(advisor.id_user)}/>
                                    </Col>
                                    <Col md={1}>
                                        <div className="vl"></div>
                                    </Col>
                                    <Col>
                                        <CoordinatorMiniCardGroup group={group} showButton={showButton}
                                                                  DeleteCoordinator={handleDeleteCoordinator}/>
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