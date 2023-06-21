import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

const GroupRegisterPage = () => {
    const [name, setName] = useState(null);

    const {id} = useParams()

    let groupId = id
    let [group, setGroup] = useState(null)
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        setGroup()
    }, [groupId])

    let postGroup = async () => {
        fetch(' /api/group/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify('1')
        })
    }

    return (

        <Container className="scrolling">
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Form.Group>
                <Button onClick={postGroup}>Submit</Button>
            </Form.Group>
        </Container>
    );
};
export default GroupRegisterPage;