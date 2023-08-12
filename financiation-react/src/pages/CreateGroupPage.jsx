import React, {useContext, useEffect, useState} from "react";
import {Container, Col, Row, Form} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import Check from "../assets/images/checked.gif";
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import {UserRowWithRadio} from "../components/UserRowWithRadio";
import {UserRowWithCheck} from "../components/UserRowWithCheck";
import Button from '@mui/material/Button';
import {SideBarGroups} from "../components/SideBarGroups";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box, {BoxProps} from '@mui/material/Box';
import Input from '@mui/material/Input';
import CoordinatorCard from "../components/CoordinatorCard";
import AdvisorCard from "../components/AdvisorCard";
import {SucceedModal} from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"


export const CreateGroupPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [coordinators, setCoordinators] = useState([])
    const [show, setShow] = useState([false])
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);


    useEffect(() => {
        getAdvisorUsers().then(r => setAdvisors(r))
        getCoordinatorUsers().then(r => setCoordinators(r))
    }, [])

    let postGroup = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/groups', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": e.target.name.value})
        })
        if (response.status === 200) {
            toggleModalsucceed();
            await postGroup()

        } else if (response.status === 500) {
            toggleModalfailed();
            await postGroup()
        } else if (response.status === 401) {
            toggleModalfailed();
            await postGroup()
        } else if (response.status === 400) {
            toggleModalfailed();
            await postGroup()

        }
    }


    return (
        <Container fluid>
            <SucceedModal message="el coordinador" show={showsuccess}/>
            <FailedModal message="el coordinador" show={showfail}/>
            <Form onSubmit={postGroup}>
                <Container>
                    <Row className={'justify-content-center'}>
                        <Col md={8}>
                            <TextField
                                fullWidth
                                id="standard-bare"
                                variant="outlined"
                                label={'Buscar Persona'}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton>
                                            <SearchIcon/>
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <CoordinatorCard/>
                </Container>
                <Container>
                    <AdvisorCard/>
                </Container>


                <SideBarGroups/>
            </Form>
        </Container>
    )
}
