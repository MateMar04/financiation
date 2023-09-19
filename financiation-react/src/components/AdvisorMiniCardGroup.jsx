import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/AdvisorMiniCard.css"
import AuthContext from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import {getGroupAdvisorUsers} from "../services/UserServices";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';

export const AdvisorMiniCardGroup = ({group, showButton, DeleteAdvisor}) => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])

    useEffect(() => {
        getGroupAdvisorUsers(authTokens.access, group.id).then(data => setAdvisors(data))
    }, [])

    return (
        <>
            {advisors?.map((advisor) => (
                <Container key={advisor.id_user}>
                    <Row className='AdvisorBorder'>
                        <Col xs={2} md={2} className='"d-flex align-items-center justify-content-center'>
                            <Avatar alt="Remy Sharp" className='AvatarImg' src={'data:image/png;base64, ' + advisor?.profile_picture}>
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
                        <Col md={1} xs={1}>
                            <Row className={'justify-content-end'}>
                                {showButton && <IconButton onClick={DeleteAdvisor}><ClearIcon/></IconButton>}
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