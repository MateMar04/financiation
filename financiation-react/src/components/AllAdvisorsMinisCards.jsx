import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import {UserParagraph} from "./UserParagraph";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import ProfilePicture from "../components/ProfilePicture";
import ProfileData from "../components/ProfileData";
import {getGroupAdvisorUsers, getUser} from "../services/UserServices";
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getCoordinatorUsers} from "../services/CoordinatorServices";

export const AllAdvisorsMinisCards = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [user, setUser] = useState()
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
    }, [])

    return (
        <>
            {advisors?.map((advisor) => (
                <Container>
                    <Row >
                        <Row className={'justify-content-center'}>
                            <Col md={{ span: 4, offset: 4 }} className="mx-auto">
                                <Avatar alt="Remy Sharp" className='AvatarImg' src={advisor?.profile_picture}>
                                </Avatar>
                            </Col>
                        </Row>
                        <Row className={'justify-content-center'}>
                                <strong className='PrimaryText'>
                                    <p>{advisor.first_name} {advisor.last_name}</p>
                                </strong>
                            <sub className='SecondaryText'>Asesor</sub>
                        </Row>
                    </Row>
                    <hr/>
                </Container>
            ))}
        </>


    )
}

export default AllAdvisorsMinisCards;