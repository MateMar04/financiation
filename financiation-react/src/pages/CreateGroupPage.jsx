import React, {useContext, useState} from "react";
import {Container, Col, Row, Form} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";

import {SideBarGroups} from "../components/SideBarGroups";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import CoordinatorCard from "../components/CoordinatorCard";
import AdvisorCard from "../components/AdvisorCard";
import {SucceedModal} from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"

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

    const handleDeleteCoordinator = () => {
        console.log('Coordinador eliminado brother')
    };

    const handleDeleteAdvisor = () => {
        console.log('Asesor eliminado brother')
    };

    return (
        <Container fluid>
            <SucceedModal message="el coordinador" show={showsuccess}/>
            <FailedModal message="el coordinador" show={showfail}/>


            <Form onSubmit={postGroup}>
                <Container>
                    <Row className={'justify-content-center'}>
                        <Col md={8} xs={9}>
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

                <Container>
                    <CoordinatorCard addToGroup={handdlerOpenDrawer} DeleteCoordinator={handleDeleteCoordinator}/>
                </Container>


                <Container>
                    <AdvisorCard addToGroup={handdlerOpenDrawer} DeleteAdvisor={handleDeleteAdvisor}/>
                </Container>

                {isDrawerOpen &&
                  <SideBarGroups OpenDrawer={handdlerOpenDrawer}/>
                }
            </Form>
        </Container>
    )
}
