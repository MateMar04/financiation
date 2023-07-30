import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/GroupCard.css"
import {UserParagraph} from "./UserParagraph";
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


export const GroupCard = ({group}) => {
    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])
    let [advisors, setAdvisors] = useState([])


    useEffect(() => {
        getGroupAdvisors()
        getGroupCoordinators()
    }, [])
    let getGroupCoordinators = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/groups/${group.id}/coordinators`, {headers: headers})
        let data = await response.json()
        setCoordinators(data)
    };

    let getGroupAdvisors = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/groups/${group.id}/advisors`, {headers: headers})
        let data = await response.json()
        setAdvisors(data)
    };

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