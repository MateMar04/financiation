import {Drawer, Box, Typography, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {Form} from "react-bootstrap";
import AdvisorMiniCard from "./AdvisorMiniCard";
import {getGroupAdvisorUsers, getGroupCoordinatorUsers} from "../services/UserServices";
import AuthContext from "../context/AuthContext";


export const SideBarGroups = ({group}) => {
    let {authTokens} = useContext(AuthContext)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    let [coordinators, setCoordinators] = useState([])
    let [advisors, setAdvisors] = useState([])


    useEffect(() => {
        getGroupAdvisorUsers(authTokens.access, group.id).then(data => setAdvisors(data))
        getGroupCoordinatorUsers(authTokens.access, group.id).then(data => setCoordinators(data))
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
                    <AdvisorMiniCard group={group}/>


                </Box>
            </Drawer>
        </>
    )
}