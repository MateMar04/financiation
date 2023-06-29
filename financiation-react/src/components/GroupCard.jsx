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
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                </div>
                <Card className='groupcard'>
                    <Container fluid className='ContainerNameGroup'>
                        <h2 className='b'>{group.name}</h2>
                    </Container>
                    <Row className='Columna1'>

                        <Col>
                            <Container>
                                <h3 className='a'>Asesores</h3>
                            </Container>
                            {advisors?.map((advisor) => (
                                <UserParagraph userId={advisor.id_user}/>
                            ))}

                        </Col>
                        <Col>
                            <Container>
                                <h3 className='a'>Coordinadores</h3>
                            </Container>
                            {coordinators?.map((coordinator) => (
                                <UserParagraph userId={coordinator.id_user}/>
                            ))}
                        </Col>
                    </Row>
                </Card>

        </Container>

)
}

export default GroupCard;