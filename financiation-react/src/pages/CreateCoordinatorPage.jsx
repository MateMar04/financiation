import React, {useContext, useState} from "react";
import {Button,Container,Form} from "react-bootstrap";
import '../assets/styles/ActivateAccountPAge.css'
import AuthContext from "../context/AuthContext";
import {SucceedModal} from "../components/SucceedModal"
import FailedModal from "../components/FailedModal";

const CoordinatorPage = () => {
    let {authTokens} = useContext(AuthContext)
    const [showfail, setShow] = useState(false);
    const [showsuccess] = useState(false);
    const toggleModalsucceed = () => setShow(!showsuccess);
    const toggleModalfailed = () => setShow(!showfail);

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
            toggleModalsucceed(); 
            await postCoordinator()  
        } else if(response.status == 500){
            toggleModalfailed(); 
            await postCoordinator()
        } else if(response.status == 401){
            toggleModalfailed();
            alert('no se a registrado la visita (Desautorizado)')
            await postCoordinator()
        } else if(response.status == 400){
            toggleModalfailed();
            alert('no se a registrado la visita (Bad request)')
            await postCoordinator()
        }
    }


    return (
        <Container className="scrolling">
            <SucceedModal message="la visita" show ={showsuccess}/>
            <FailedModal message="la visita" show ={showfail}/>
            <Form onSubmit={postCoordinator}>
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

export default CoordinatorPage;