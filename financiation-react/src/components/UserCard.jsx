import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import {UserParagraph} from "./UserParagraph";
import AuthContext from "../context/AuthContext";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from 'react-bootstrap/Stack';


export const UserCard = ({group, profileImg}) => {

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
        <>
            {advisors.map((advisor) => (
                <Container key={advisor.id_user}>

                    <Row  className='AdvisorBorder'>
                        <Col xs="3" md="3" className='"d-flex align-items-center justify-content-center'>
                            <Avatar alt="Remy Sharp" src={profileImg} className='AvatarImg'/>
                        </Col>
                        <Col>
                            <Row>
                                <div className="d-flex align-items-center">
                                <strong>
                                    <UserParagraph userId={advisor.id_user} className='PrimaryText'/>
                                </strong>
                                    </div>
                                    <sub className='SecondaryText'>Asesor</sub>
                            </Row>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
            ))}
        </>


    )
}

export default UserCard;