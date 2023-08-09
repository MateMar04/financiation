import React, {useContext, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import '../assets/styles/ActivateAccountPAge.css'
import {useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {SucceedModal} from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"

const AdvisorPage = () => {
    let {authTokens} = useContext(AuthContext)
    let history = useNavigate()
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);


    let postAdvisor = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/advisor/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "id_user": e.target.id_user.value,
                "id_group": e.target.id_group.value
            })
        })
        if (response.status === 200) {

            toggleModalsucceed();
            await postAdvisor()

        } else if (response.status == 500) {
            toggleModalfailed();

            await postAdvisor()

        } else if (response.status == 401) {
            toggleModalfailed();

            await postAdvisor()

        } else if (response.status == 400) {
            toggleModalfailed();

            await postAdvisor()
        }
    }
    return (
        <Container className="scrolling">

            <SucceedModal message="el asesor" show={showsuccess}/>
            <FailedModal message="el asesor" show={showfail}/>
            <Form onSubmit={postAdvisor}>
                <Form.Group>
                    <Form.Control
                        type="number"
                        placeholder="Enter user id"
                        name="id_user"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="number"
                        placeholder="Enter group id"
                        name="id_group"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default AdvisorPage;