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
        } else if(response.status == 500){
            //handleShow()
            //<SucceedModal message="la visita" onclose = {setShow(false)} show ={show}/>
            //await postVisit()
            alert('no se a registrado la visita (Hay un campo vacio)')
        } else if(response.status == 401){
            //handleShow()
            //<SucceedModal message="la visita" onclose = {setShow(false)} show ={show}/>
            //await postVisit()
            alert('no se a registrado la visita (Desautorizado)')
        } else if(response.status == 400){
            //handleShow()
            //<SucceedModal message="la visita" onclose = {setShow(false)} show ={show}/>
            //await postVisit()
            alert('no se a registrado la visita (Bad request)')
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