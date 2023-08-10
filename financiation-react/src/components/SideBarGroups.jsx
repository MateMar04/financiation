import {Box, Drawer} from '@mui/material';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {AdvisorMiniCardForming} from "./AdvisorMiniCardForming";
import {CoordinatorMiniCardForming} from "./CoordinatorMiniCardForming";
import {Col, Container, Row} from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import "../assets/styles/AdvisorMiniCard.css";


export const SideBarGroups = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <>
            <Button variant={'outlined'}
                    onClick={() => setIsDrawerOpen(true)}
            className={'AñadirButton'}>
                AÑADIR
            </Button>
            <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box width={'250px'} textAlign={'center'}>
                    <Container fluid>
                        <Row className={'justify-content-center'} style={{paddingTop: '25px'}}>
                            <TextField label="Nombre del grupo" variant="outlined" name={'name'}
                                       style={{maxWidth: '180px'}} InputProps={{sx: {borderRadius: '25px'}}}/>
                        </Row>
                        <hr/>
                        <AdvisorMiniCardForming/>
                        <CoordinatorMiniCardForming/>
                        <div className={'btn-flotante'}>
                            <Row className={'justify-content-center'}>
                                <hr/>
                                <Button variant="outlined" name={'name'} style={{maxWidth: '180px'}}
                                        InputProps={{sx: {borderRadius: '25px'}}} type="submit">Crear Grupo</Button>
                            </Row>
                        </div>

                    </Container>
                </Box>
            </Drawer>
        </>
    )
}