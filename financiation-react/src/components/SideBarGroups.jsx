import {Drawer, Box, Typography, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {Form} from "react-bootstrap";
import {UserRowWithRadio} from "./UserRowWithRadio";
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import AuthContext from "../context/AuthContext";
import {AllAdvisorsMinisCards} from "./AllAdvisorsMinisCards";
import {Col, Container, Row} from 'react-bootstrap';
import TextField from '@mui/material/TextField';


export const SideBarGroups = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
    }, [])

    return (
        <>
            <Button variant={'outlined'}
                    onClick={() => setIsDrawerOpen(true)}>
                AÑADIR
            </Button>
            <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box width={'250px'} textAlign={'center'}>
                    <Container fluid>

                        <Row className={'justify-content-md-center'} style={{ paddingTop:'25px'}}>
                            <TextField label="Nombre del grupo" variant="standard" name={'name'} style={{maxWidth: '180px'}}/>
                        </Row>
                        <AllAdvisorsMinisCards/>
                    </Container>
                </Box>
            </Drawer>
        </>
    )
}