import React, {useContext, useEffect, useState} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

const CoordinatorPage = () => {
    const [id_user ,setUser] = useState("");
    const [id_group ,setGroup] = useState("");
    const {id} = useParams()

    let coordinatorId = id
    let [coordinator, setCoordinator] = useState(null)
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        setCoordinator()
        getCoordinator()
    }, [coordinatorId])

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

    let getCoordinator = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/coordinator/${coordinatorId}/`, {headers: headers})
        let data = await response.json()
        if (response.status === 200) {
            setCoordinator(data)
        } else if (response.statusText === 'Unauthorized') {
            logoutUser()
        }
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
        <div>
            <h1>{coordinator?.id_group} {coordinator?.id_user}</h1>
        </div>               
        </Container>       
    );

};
export default CoordinatorPage;
