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
                <Box p={2} width={'250px'} textAlign={'center'} role={'presentation'}>
                    <Typography variant={'h6'} component={'div'}>Grupo de</Typography>
                    <hr/>
                    <Form.Control name="name" placeholder='Nombre' type='text' required></Form.Control>
                    <Typography variant={'h7'}>Asesores</Typography>
                    <AllAdvisorsMinisCards/>
                </Box>
            </Drawer>
        </>
    )
}