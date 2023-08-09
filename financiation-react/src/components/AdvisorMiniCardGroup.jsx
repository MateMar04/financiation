import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import {UserParagraph} from "./UserParagraph";
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import ProfilePicture from "../components/ProfilePicture";
import ProfileData from "../components/ProfileData";
import {getGroupAdvisorUsers, getUser} from "../services/UserServices";


export const AdvisorMiniCardGroup = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [user, setUser] = useState()

    useEffect(() => {
        getGroupAdvisorUsers(authTokens.access, group.id).then(data => setAdvisors(data))
        getUser(authTokens.access).then(data => setUser(data))
    }, [])

    return (
        <>
            {advisors?.map((advisor) => (
                <Container key={advisor.id_user}>
                    <Row className='AdvisorBorder'>
                        <Col xs="2" md="2" className='"d-flex align-items-center justify-content-center'>
                            <Avatar alt="Remy Sharp" className='AvatarImg' src={advisor?.profile_picture}
                                    username={user?.username}>
                            </Avatar>
                        </Col>
                        <Col>
                            <Row>
                                <div className="d-flex align-items-center">
                                    <strong className='PrimaryText'>
                                        <p>{advisor.first_name} {advisor.last_name}</p>
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

export default AdvisorMiniCardGroup;