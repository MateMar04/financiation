import React, {useContext, useState} from "react";
import {Button,Container,Form} from "react-bootstrap";
import '../assets/styles/ActivateAccountPAge.css'
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {SucceedModal} from "../components/SucceedModal"

const CoordinatorPage = () => {
    let {authTokens} = useContext(AuthContext)
    let history = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    

    let postCoordinator = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/coordinator/add/', {
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
            await postCoordinator()  
        } else {
            alert('Something went wrong')
        }
    }


    return (

        <Container className="scrolling">
            <Form onSubmit={postCoordinator}>
                <Form.Group>
                    <Form.Control
                        type="number"
                        placeholder="Enter user id"
                        name="id_user"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="number"
                        placeholder="Enter group id"
                        name="id_group"
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit" onClick={setShow(true)}>Submit</Button> 
                </Form.Group>
                <SucceedModal message="el coordinador" onclose = {setShow(false)} show ={show}/>
            </Form>
           
        </Container>
    );
}

export default CoordinatorPage;