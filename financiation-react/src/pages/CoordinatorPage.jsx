import React, {useContext, useEffect, useState} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

const CoordinatorPage = () => {
    const [id_user ,setUser] = useState("");
    const [id_group ,setGroup] = useState("");

    let [coordinator, setCoordinator] = useState(null)
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        setCoordinator()
    })

    let postCoordinator = async () => {
        fetch(' /api/coordinator/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify(coordinator)
        })
    }
    return (

        <Container className="scrolling">
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={id_group}
                        onChange={(e) => setGroup(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={id_user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Form.Group>
                <Button onClick={postCoordinator}>Submit</Button>
            </Form.Group>
        </Container>
    );

};
export default CoordinatorPage;
