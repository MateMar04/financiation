import React, {useContext} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import Check from "../assets/images/checked.gif";
import '../assets/styles/ActivateAccountPAge.css'
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const CoordinatorPage = () => {
    let {authTokens} = useContext(AuthContext)
    let history = useNavigate()
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            handleShow()
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
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Container className='justify-content-center'>
                        <Row className='justify-content-center'>
                            <Col md={5}>
                                <img src={Check} alt="CheckButton" className="mx-auto img-fluid"/>
                                <p className="text-center">¡Se a registrado el coordinador correctamente!</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={'/login'}>
                        <Button variant="success">
                            OK
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default CoordinatorPage;