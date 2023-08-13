import React, {useContext, useEffect, useState} from "react";
import {Container, Col, Row, Form} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import {SideBarGroups} from "../components/SideBarGroups";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import CoordinatorCard from "../components/CoordinatorCard";
import AdvisorCard from "../components/AdvisorCard";
import {SucceedModal} from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"
import {Collapse, Fade, Grow, Slide, Zoom} from "@mui/material";
import Button from "@mui/material/Button";
import GroupsIcon from '@mui/icons-material/Groups';


export const CreateGroupPage = () => {
    let {authTokens} = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)


    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);


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

    const handdlerOpenDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

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
                        <Col md={1} xs={1} lg={1}>
                            <IconButton onClick={handdlerOpenDrawer} sx={{width: 56, height: 56}}
                                        className={'GroupsIcon'}><GroupsIcon/></IconButton>
                        </Col>
                    </Row>
                </Container>
                <Zoom in>
                    <Container>
                        <CoordinatorCard addToGroup={handdlerOpenDrawer}/>
                    </Container>
                </Zoom>
                <Zoom in>
                    <Container>
                        <AdvisorCard addToGroup={handdlerOpenDrawer}/>
                    </Container>
                </Zoom>

                {isDrawerOpen && <Slide direction={'left'} in>

                    <div><SideBarGroups OpenDrawer={handdlerOpenDrawer}/></div>
                </Slide>}
            </Form>
        </Container>
    )
}
