import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import GroupCard from "../components/GroupCard";
import {getGroupById} from "../services/GroupServices"

export const ModifyGroupPage = () => {

    const {id} = useParams()

    let GroupId = id
    let [group, setGroup] = useState(null)
    let {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getGroupById(authTokens.access).then(data => setGroup(data))
    }, [GroupId])

    return (
        <div>
            {group?.map((group) => (
            <Container>
                <GroupCard group={group}/>
            </Container>
        ))}
        </div>
    )
}
                                    
