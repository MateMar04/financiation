import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/GroupCard.css"
import AuthContext from "../context/AuthContext";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AdvisorMiniCard from "../components/AdvisorMiniCard";
import CoordinatorMiniCard from "./CoordinatorMiniCard";
import {styled} from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import {getGroupAdvisorUsers, getGroupCoordinatorUsers} from "../services/UserServices";
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@mui/material/IconButton";

export const GroupCard = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])
    let [advisors, setAdvisors] = useState([])


    useEffect(() => {
        getGroupAdvisorUsers(authTokens.access, group.id).then(data => setAdvisors(data))
        getGroupCoordinatorUsers(authTokens.access, group.id).then(data => setCoordinators(data))
    }, [])

    const Grid = styled(MuiGrid)(({theme}) => ({
        width: '100%',
        ...theme.typography.body2,
        '& [role="separator"]': {
            margin: theme.spacing(0, 2),
        },
    }));

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
                         <IconButton type="submit" aria-label="search" href='/group/modify'>
                        <CreateIcon/>
                         </IconButton>
                        <Container>
                            <Row>
                                <Col>
                                    <AdvisorMiniCard group={group}/>
                                </Col>
                                <Col md={1}>
                                    <div className="vl"></div>
                                </Col>
                                <Col>
                                    <CoordinatorMiniCard group={group}/>
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