import React, {useContext, useEffect, useState} from 'react';
import '../assets/styles/AddVisitPage.css';
import {Button, Container, Form, FloatingLabel, Row, Col} from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import Autocomplete from '@mui/material/Autocomplete';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddVisitPage = () => {
    const [flyer, setImage] = useState(null);
    const [distance, setDistance] = useState('');
    const [travel_time, setTravelTime] = useState('');
    const [visit_date, setVisitDate] = useState(null);
    const [civil_registration, setCivilRegistration] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [modernization_fund, setModernizationFund] = useState('');
    const [start_time, setStartTime] = useState('');
    const [finish_time, setFinishTime] = useState('');
    const [place_name, setPlaceName] = useState('');
    const [id_locality, setLocality] = useState('');
    const [id_group, setGroup] = useState('');
    const [id_visit_status, setVisitStatus] = useState('');
    const [id_agreement, setAgreement] = useState('');
    const [id_contacted_referrer, setContactedReferrer] = useState('');
    const [id_address, setAddress] = useState('');
    const [id_logo, setLogo] = useState('');

    let [localities, setLocalities] = useState([]);
    let [visit, setVisit] = useState(null);
    let {authTokens, logoutUser} = useContext(AuthContext);

    useEffect(() => {
        setVisit();
    });

    let getLocalities = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/locality/', {headers: headers})
        let data = await response.json()
        setLocalities(data)
    };

    let postVisit = async () => {
        fetch('/api/visit/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'JWT ' + String(authTokens.access),
                Accept: 'application/json',
            },
            body: JSON.stringify(visit),
        });
    };

    const top100Films = [
        {label: 'The Shawshank Redemption', year: 1994},
        {label: 'The Godfather', year: 1972},
        {label: 'The Godfather: Part II', year: 1974},
        {label: 'The Dark Knight', year: 2008},
        {label: '12 Angry Men', year: 1957},
        {label: "Schindler's List", year: 1993},
        {label: 'Pulp Fiction', year: 1994},
        {label: 'The Lord of the Rings: The Return of the King', year: 2003},
    ];
    const modernizationFounds = [
        {label: 'Depositado'},
        {label: 'No aprobado a la espera de nuevo proyecto'}
    ]
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    return (
        <Container>
            <Container>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    renderInput={(params) => <TextField{...params} label="Movie"/>}
                />
            </Container>
            <Container>
                <a>Tiempo de viaje</a>
                <Form.Control
                    type="time"
                    placeholder="Tiempo de viaje"
                    name="travel_time"
                    value={travel_time}
                    onChange={(e) => setTravelTime(e.target.value)}
                    className="scrolling"
                />
            </Container>

            <Container className='justify-content-center'>
                <Row>
                    <Col className='d-flex align-items-center justify-content-center'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label='Fecha de visita'
                                name="visit_date"
                                value={visit_date}
                                onChange={(date) => setVisitDate(date)}
                                renderInput={(params) => <TextField {...params} />}
                                format='DD/MM/YYYY'

                            />
                        </LocalizationProvider>
                    </Col>

                    <Col className='d-flex align-items-center justify-content-center'>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked value={civil_registration}
                                                                 onChange={(e) => setCivilRegistration(e.target.value)}/>}
                                              label="Necesita registro civil"/>
                        </FormGroup>
                    </Col>

                    <Col className='d-flex align-items-center justify-content-center'>
                        <FormGroup>
                            <FormControlLabel required control={<Checkbox value={accommodation}
                                                                          onChange={(e) => setAccommodation(e.target.value)}/>}
                                              label="Hay hospedaje en la localidad"/>
                        </FormGroup>
                    </Col>
                </Row>
            </Container>


            <Container>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={modernizationFounds}
                    renderInput={(params) => <TextField{...params}
                                                       label="Fondo de modernizacion"
                                                       value={modernization_fund}
                                                       onChange={(e) => setModernizationFund(e.target.value)}
                    />}
                />
            </Container>

            <Container>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker
                                    label='Hora de inicio de la jornada'
                                    name="start_time"
                                    value={start_time}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Col>

                    <Col className='d-flex justify-content-center'>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker
                                    label='Hora de fin de la jornada'
                                    name="finish_time"
                                    value={finish_time}
                                    onChange={(e) => setFinishTime(e.target.value)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Col>
                </Row>
            </Container>

            <Container>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '80ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField name="place_name" label="Nombre del Lugar" variant="standard" value={place_name}
                               onChange={(e) => setPlaceName(e.target.value)}/>
                    <TextField id="outlined-basic" label="Nombre del Lugar" variant="outlined"/>
                </Box>
            </Container>


            <FloatingLabel controlId="floatingTextarea2" label="ID del Grupo">
                <Form.Control
                    type="text"
                    placeholder="Enter id_group"
                    name="id_group"
                    value={id_group}
                    onChange={(e) => setGroup(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="ID del estado de visita">
                <Form.Control
                    type="text"
                    placeholder="Enter id_visit_status"
                    name="id_visit_status"
                    value={id_visit_status}
                    onChange={(e) => setVisitStatus(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="ID del acuerdo">
                <Form.Control
                    type="text"
                    placeholder="Enter id_agreement"
                    name="id_agreement"
                    value={id_agreement}
                    onChange={(e) => setAgreement(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="ID del referente contactado">
                <Form.Control
                    type="text"
                    placeholder="Enter id_contacted_referrer"
                    name="id_contacted_referrer"
                    value={id_contacted_referrer}
                    onChange={(e) => setContactedReferrer(e.target.value)}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="ID de la direccion">
                <Form.Control
                    type="text"
                    placeholder="Enter id_address"
                    name="id_address"
                    value={id_address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="ID del logo">
                <Form.Control
                    type="text"
                    placeholder="Enter id_logo"
                    name="id_logo"
                    value={id_logo}
                    onChange={(e) => setLogo(e.target.value)}
                />
            </FloatingLabel>

            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Localidades</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Localidad"
                        name="id_locality"
                        value={id_locality}
                        onChange={(e) => setLocality(e.target.value)}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        {localities?.map((locality) => (
                            <MenuItem item={locality}>{locality}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Box>

            <Container>
                <Button onClick={postVisit}>Guardar Visita</Button>
            </Container>
        </Container>
    );
};

export default AddVisitPage;