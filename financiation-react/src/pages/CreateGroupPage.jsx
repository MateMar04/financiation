import React, {useContext, useEffect, useState} from "react";
import {Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {UserRowWithRadio} from "../components/UserRowWithRadio";
import {UserRowWithCheck} from "../components/UserRowWithCheck";
import {Link, useNavigate} from 'react-router-dom'
import Check from "../assets/images/checked.gif";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


export const CreateGroupPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [coordinators, setCoordinators] = useState([])
    let history = useNavigate()
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getAdvisors()
        getCoordinators()
    }, [])

    let getAdvisors = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/advisor/', {headers: headers})
        let data = await response.json()
        setAdvisors(data)
    };

    let getCoordinators = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/coordinator/', {headers: headers})
        let data = await response.json()
        setCoordinators(data)
    };

    let postGroup = async (e) => {
        e.preventDefault()
        let response = await fetch(' /api/group/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": e.target.name.value})
        })
        if (response.status === 200) {
            handleShow()
            await postGroup()
        } else {
            alert('Something went wrong')
        }
    }

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Container>
            <Form onSubmit={postGroup}>

                <Row>
                    <h3>Coordinadores</h3>
                        <Container className='create-group-card-scroll'>
                            {coordinators?.map((coordinator) => (
                                <UserRowWithRadio userId={coordinator.id_user}/>
                            ))}
                        </Container>

                        <h3>Asesores</h3>
                        <Container className='create-group-card-scroll'>
                            {advisors?.map((advisor) => (
                                <UserRowWithCheck userId={advisor.id_user}></UserRowWithCheck>
                            ))}
                        </Container>

                <Button type="submit">Crear</Button>
                </Row>
            </Form>

            <div>
                {['right'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>Añadir</Button>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Container className='justify-content-center'>
                        <Row className='justify-content-center'>
                            <Col md={5}>
                                <img src={Check} alt="CheckButton" className="mx-auto img-fluid"/>
                                <p className="text-center">¡Se a registrado el grupo correctamente!</p>
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
    )
}
