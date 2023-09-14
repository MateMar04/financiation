import React, {useContext, useEffect} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import Check from "../assets/images/checked.gif";
import '../assets/styles/ActivateAccountPAge.css'
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {getAdvisors} from "../services/AdvisorServices";
import {getUser, getUsers} from "../services/UserServices";


const AdvisorPage = () => {
    let {authTokens} = useContext(AuthContext)
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [users, setUsers] = React.useState();


    useEffect(() => {
        getUsers(authTokens.access).then(data => setUsers(data));
    }, []);

    let postAdvisor = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/advisors', {
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
            await postAdvisor()
        } else if (response.status === 500) {

            alert('no se a registrado la visita (Hay un campo vacio)')
        } else if (response.status === 401) {
            alert('no se a registrado la visita (Desautorizado)')
        } else if (response.status === 400) {
            alert('no se a registrado la visita (Bad request)')
        }
    }


    return (

        <Container className="scrolling">
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
            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Nombre de la persona</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Nombre de la persona"
                    >
                        {users?.map((user) => (
                            <MenuItem key={user.id} value={user.id}>{user.name}{user.last_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Container>
    );
}
export default AdvisorPage;