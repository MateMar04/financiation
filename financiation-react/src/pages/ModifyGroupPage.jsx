import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import GroupCard from "../components/GroupCard";
import {getGroups} from "../services/GroupServices"

export const ModifyGroupPage = () => {

    const {id} = useParams()

    let GroupId = id
    let [groups, setGroup] = useState(null)
    let {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getGroups(authTokens.access).then(data => setGroup(data))
    }, [GroupId])

    return (
        <div>
            {groups?.map((group) => (
            <Container>
                <GroupCard group={group}/>
            </Container>
        ))}
        </div>
    )
}
                                    
