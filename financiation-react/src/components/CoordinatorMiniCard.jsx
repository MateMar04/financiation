import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import {UserParagraph} from "./UserParagraph";
import AuthContext from "../context/AuthContext";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from 'react-bootstrap/Stack';


export const CoordinatorMiniCard = ({group, profileImg}) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
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


    return (
        <>
            {coordinators?.map((coordinator) => (
                <Container key={coordinator.id_user}>
                    <Row className='AdvisorBorder'>
                        <Col xs="3" md="3" className='"d-flex align-items-center justify-content-center'>
                            <Avatar alt="Remy Sharp" src={profileImg} className='AvatarImg'/>
                        </Col>
                        <Col>
                            <Row>
                                <div className="d-flex align-items-center">
                                    <strong>
                                        <UserParagraph className='PrimaryText' userId={coordinator.id_user}/>
                                    </strong>
                                </div>
                                <sub className='SecondaryText'>Coordinador</sub>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            ))}
        </>

    )
}

export default CoordinatorMiniCard;