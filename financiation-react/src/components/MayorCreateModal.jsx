import '../assets/styles/RowWithCheck.css'
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Container, Card } from 'react-bootstrap';
import '../assets/styles/AddMayorPage.css';


export const MayorCreateModal = (props) => {
    return (
            <Modal show={props.show} >
                <Container className="container-addmayor container-addmayor-modal">

                    <Form >
                        <h3 className={'h3LoginPage'}>Ingresar Intendente</h3>


                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Form.Group style={{ textAlign: 'center', marginRight: '10px' }}>
                                <TextField
                                    className="inputNombre"
                                    label="Nombre"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" >
                                                <AccountCircleOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 6, borderColor: '#f4f4f4' },
                                    }}
                                />
                            </Form.Group>
                            <Form.Group style={{ textAlign: 'center' }}>
                                <TextField
                                    className="inputNombre"
                                    label="Apellido"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 6, borderColor: '#f4f4f4' },
                                    }}
                                />
                            </Form.Group>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Form.Group style={{ textAlign: 'center', marginRight: '10px' }}>
                                <TextField
                                    className="inputNombre"
                                    label="Telefono"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 6, borderColor: '#f4f4f4' },
                                    }}
                                />
                            </Form.Group>
                            <Form.Group style={{ textAlign: 'center' }}>
                                <TextField
                                    className="inputNombre"
                                    label="Email"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 6, borderColor: '#f4f4f4' },
                                    }}
                                />
                            </Form.Group>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button type="submit">Registrar</Button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <Button variant="outlined" color="primary" onClick={props.onClose}>
                                Cancelar
                            </Button>
                            <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                                Borrar
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Modal>


    )
}

export default MayorCreateModal