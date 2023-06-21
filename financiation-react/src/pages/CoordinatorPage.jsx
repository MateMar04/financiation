import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Container, Form} from "react-bootstrap";

const navigate = useNavigate;

const CoordinatorPage = () => {
    const [id_user ,setUser] = useState("");
    const [id_group ,setGroup] = useState("");

    let [request, setRequest] = useState(null)
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        setRequest()
    })

    let getpostCoordinator = async () => {
        fetch(' /api/Coordinator/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify(Coordinator)
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
                <Button onClick={CreateGroupInfo}>Submit</Button>
            </Form.Group>
        </Container>
    );

};
export default CreateGroupPage;
