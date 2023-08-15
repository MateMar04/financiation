import {Box, Drawer} from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import {AdvisorMiniCardForming} from "./AdvisorMiniCardForming";
import {CoordinatorMiniCardForming} from "./CoordinatorMiniCardForming";
import {Container, Row} from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import "../assets/styles/AdvisorMiniCard.css";


export const SideBarGroups = ({OpenDrawer}) => {
    return (
        <>
            <Drawer anchor='right' open={OpenDrawer} onClose={() => OpenDrawer(false)}>
                <Box width={'250px'} textAlign={'center'}>
                    <Container fluid>
                        <Row className={'justify-content-center'} style={{paddingTop: '25px'}}>
                            <TextField label="Nombre del grupo" variant="outlined" name={'name'}
                                       style={{maxWidth: '180px'}} InputProps={{sx: {borderRadius: '25px'}}}/>
                        </Row>
                        <hr/>

                        <AdvisorMiniCardForming/>

                        <CoordinatorMiniCardForming/>
                        <div className={'BtnCreateGroup'}>
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