import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {UserRowWithRadio} from "../components/UserRowWithRadio"
import {UserRowWithCheck} from "../components/UserRowWithCheck"
import {Link, useNavigate} from 'react-router-dom'
import Check from "../assets/images/checked.gif";
import {SucceedModal} from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"
import {getGroups} from "../services/GroupServices"

export const ModifyGroupPage = () => {

    const {id} = useParams()

    let GroupId = id
    let [groups, setGroup] = useState(null)
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        getGroups(authTokens.access).then(data => setGroup(data))
    }, [adviGroupIdsedId])

    return (
        <fragment>
        {groups?.map((group) => (
            <Container>
                <GroupCard group={group}/>
            </Container>
        ))}
        </fragment>
    )
}
                                    
