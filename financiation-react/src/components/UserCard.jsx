import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/GroupCard.css"
import {UserParagraph} from "./UserParagraph";
import AuthContext from "../context/AuthContext";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';


export const UserCard = ({group}) => {

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

                <Container>
                    <Box component="span" sx={{p: 2, border: '1px dashed grey'}}>
                        <Row>
                            <Col xs="1" md="3">
                                <Avatar alt="Remy Sharp" src=""/>
                            </Col>
                            <Col>
                                <Row>
                                    <Typography>
                                        {advisors?.map((advisor) => (
                                            <UserParagraph userId={advisor.id_user}/>
                                        ))}
                                    </Typography>
                                    <a><b>Asesor</b></a>
                                </Row>
                            </Col>
                        </Row>

                    </Box>
                </Container>

            </div>
        </Container>

    )
}

export default UserCard;